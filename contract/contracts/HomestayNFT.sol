// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {AggregatorV3Interface} from "@chainlink/contracts@1.0.0/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract DataConsumerV3 {
    AggregatorV3Interface internal dataFeed;
    /**
     * Network: Binance smart chain testnet
     * Aggregator: BNB/USD
     * Address: 0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526
     */
    constructor() {
        dataFeed = AggregatorV3Interface(
            0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526
        );
    }
    /**
     * Returns the latest answer.
     */
    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return answer;
    }
}


contract HomestayNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Address for address;
    using SafeMath for uint256;
    Counters.Counter private _tokenIdCounter;

    
    uint256 public immutable _startTime;                          //time create contract
    bool[] _roomValidity;                                           //array of validity of rooms [room id] (validity of room is decided by owner of homestay)
    uint256 public _noRooms;                                        //number of rooms when create contract
    uint256[] public _price;                                       //price of first 2 hours, every hour after first 2 hours, every day, every month. 
    mapping (address=>uint256) private _noNftOfRenter;              //number of nfts (rental contract) of renter [address renter]
    uint256[] private _nftsOfProvider;                              //array of nfts (rental contract of users) of provider [token id]
    mapping (address=>uint256) private _noNftOfProvider;            //number of nfts of provider [address provider]
    mapping(address=>uint256[]) private _nftsOfRenter;              //array of nfts of renter [address renter]
    mapping(address => bool) private _authorizedGateways; 

    event Mint(address indexed provider, address indexed renter, uint256 roomId, uint256 rentAmount, uint256 startTimestamp, uint256 endTimestamp, uint256 createTimestamp, uint256 indexed tokenId, bool isCancelled, bool isCheckedOut);
    event LogIoTDevice(uint256 indexed tokenId, uint256 deviceId, bool status, uint256 timestamp);
    event Checkout(uint256 indexed tokenId, uint256 indexed roomId, uint256 startTimestamp);
    event DataSent(string encryptedData, bytes32 hashedData);
    //rental contract between provider and renter (NFT)
    struct NFT{
        address provider;
        address renter;
        uint256 roomId; 
        uint256 rentAmount;
        uint256 startTimestamp;
        uint256 endTimestamp;
        uint256 createTimestamp; 
        bool isCancelled;
        bool isCheckedOut;  
    }
    
    mapping(uint256 => NFT) public _nfts;                           //all nfts that were created
    mapping(uint256 => string) public _logIoTdevices;       //all logIoTdevice that were created

    //constructor function: all rooms are valid (for use) and store time constructed.
    constructor(uint256 noRooms, uint256 firstTwoHourPrice, uint256 hourPrice, uint256 dayPrice, uint256 monthPrice) ERC721("HomestayNFT", "HNFT") Ownable() {
        _startTime = block.timestamp;
        _noRooms = noRooms;
        for (uint256 i = 0; i < noRooms; i++) {
            _roomValidity.push(true);
        }
        _price.push(firstTwoHourPrice);
        _price.push(hourPrice);
        _price.push(dayPrice);
        _price.push(monthPrice);
    }


    modifier onlyAuthorizedGateway() {
        require(_authorizedGateways[msg.sender], "Sender is not an authorized gateway");
        _;
    }

    // function to add an authorized gateway
    function addAuthorizedGateway(address gateway) external onlyOwner {
        _authorizedGateways[gateway] = true;
    }

    // function to remove an authorized gateway
    function removeAuthorizedGateway(address gateway) external onlyOwner {
        _authorizedGateways[gateway] = false;
    }

    //function change the number of room of homestay (in case want to expand homestay)

    function setNoRooms(uint256 noRooms) public {
        require(noRooms>_noRooms,"Number of rooms must be greater than at present");
        for (uint256 i = _noRooms; i < noRooms; i++) {
            _roomValidity[i] = true;
        }
        _noRooms = noRooms;
    }

    //functions about validity of rooms

    function getRoomValidity(uint256 roomId) public view returns(bool){
        return _roomValidity[roomId];
    }
    function getAllRoomsValidity() public view returns(bool[] memory){
        return _roomValidity;
    }
    function setRoomValidity(uint256 roomId, bool isValid) public onlyOwner {
        require(roomId>0, "Invalid room id");
        _roomValidity[roomId] = isValid;
    }
    function setMultipleRoomsValidity(uint256[] calldata roomIds,bool[] calldata isValid) public onlyOwner{
        //function to change validity of many rooms at one time
        require(roomIds.length == isValid.length, "Arrays length mismatch");
        for (uint256 i = 0; i < roomIds.length; i++) {
            _roomValidity[roomIds[i]] = isValid[i];
        }
    }

    //functions about price of renting a room according to 2 first hours, every hour after 2 first hours, every day, every month.
    function getPrice() public view returns(uint256[] memory){
        return _price;
    }

    function setPrice(uint256[4] calldata price) public onlyOwner {
        _price = price;
    }

    //mint a token (create a homestay contract by user)
    function safeMint(uint256 roomId, uint256 rentAmount, uint256 startTimestamp, uint256 endTimestamp) public {
        require(_roomValidity[roomId]==true,"This room is not available");
        require(startTimestamp>block.timestamp,"Invalid start time");
        uint256 tokenId = _tokenIdCounter.current();
        
        uint256 timeDiff = endTimestamp - startTimestamp;
        require(timeDiff > 0, "Invalid timestamps");

        //rent amount for owner is decided by owner
        //if not the owner , the rent amount will be calculated
        if (msg.sender != owner()) rentAmount = calculateRentAmount(timeDiff);
        _nfts[tokenId] = NFT(owner(),msg.sender,roomId,rentAmount,startTimestamp,endTimestamp,block.timestamp,false,false);
        _nftsOfProvider.push(tokenId);
        _nftsOfRenter[msg.sender].push(tokenId);
        _tokenIdCounter.increment();
        _noNftOfProvider[owner()]++;
        _noNftOfRenter[msg.sender]++;
        _safeMint(msg.sender,tokenId);
        emit Mint(owner(),msg.sender,roomId,rentAmount,startTimestamp,endTimestamp,block.timestamp,tokenId,false,false);
    } 
    function calculateRentAmount(uint256 timeDiff) public{
        uint256 calRentAmount;
        if (timeDiff <= 2 hours) {
            calRentAmount = _price[0];
        } else if (timeDiff > 2 hours && timeDiff < 24 hours) {                                 // Calculate price for hours after the first 2 hours
            uint256 extraHours = (timeDiff - 2 hours + 3599) / 1 hours;                         // Round up to the nearest hour
            calRentAmount = _price[0] + (extraHours * _price[1]);
        } else if (timeDiff >= 24 hours && timeDiff < 720 hours) {                              // Calculate price for days
            uint256 numDays = timeDiff / 1 days;                                                // Round up to the nearest day
            uint256 remainingHours = (timeDiff % 1 days + 3599) / 1 hours;
            calRentAmount = (numDays * _price[2]) + (remainingHours * _price[1]);
        } else {                                                                                // Calculate price for months, days, and remaining hours
            uint256 numMonths = timeDiff / 30 days;                                             // Round up to the nearest month
            uint256 remainingDays = (timeDiff % 30 days) / 1 days;                              // Round up to the nearest day
            uint256 remainingHours = ((timeDiff % 30 days) % 1 days + 3599) / 1 hours;          // Round up to the nearest hour
            calRentAmount = (numMonths * _price[3]) + (remainingDays * _price[2]) + (remainingHours * _price[1]);
        }
        return calRentAmount;
    }

    //cancel contract and mark as isCancellled
    function cancelContract(uint256 tokenId) public{
        require(msg.sender==ownerOf(tokenId),"You are not room's owner");
        _noNftOfProvider[owner()]--;
        _noNftOfRenter[msg.sender]--;
        transferFrom(msg.sender, address(0), tokenId);
        _nfts[tokenId].isCancelled = true;
    }

    //get info of a NFT (a rental contract)
    function getNFTInfo(uint256 tokenId) public view returns (
        address provider,
        address renter,
        uint256 roomId,
        uint256 rentAmount,
        uint256 startTimestamp,
        uint256 endTimestamp,
        uint256 createTimestamp,
        bool isCancelled,
        bool isCheckedOut
    ) {
        require(ownerOf(tokenId)!=address(0), "Token ID does not exist");
        NFT memory nft = _nfts[tokenId];
        return (nft.provider,nft.renter,nft.roomId,nft.rentAmount,nft.startTimestamp,nft.endTimestamp,nft.createTimestamp,nft.isCancelled,nft.isCheckedOut);
    }

    //functions return array of nfts of renter/provider

    function getNftsIdOfRenter() public view returns(uint256[] memory) {
        return _nftsOfRenter[msg.sender];
    }
    function getNftsIdOfProvider() public view returns(uint256[] memory) {
        return _nftsOfProvider;
    }

    //function that store log of iot devices when checkout 
    function checkout(uint256 tokenId) public {
        require(_nfts[tokenId].isCheckedOut == false, "This contract has already been checked out")
        require(ownerOf(tokenId)!=address(0), "Token ID does not exist");                                
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of this token");      

        _nfts[tokenId].isCheckedOut = true;
        emit Checkout(tokenId,_nfts[tokenId].roomId,_nfts[tokenId].startTimestamp);
    }

    //function that allows iot gateway send log of iot devices
    function sendData(uint256 tokenId, string memory encryptedData, bytes32 hashedData) public onlyAuthorizedGateway {
        _logIoTdevices[tokenId] = encryptedData;
        emit DataSent(encryptedData, hashedData);
    }

    //function that return log iot devices of a rental contract
    function getLogsForToken(uint256 tokenId) public view returns (string memory) {
        require(ownerOf(tokenId)!=address(0), "Token ID does not exist");
        return _logIoTdevices[tokenId];
    }


    function tokenURI(uint256 tokenId) public view  override(ERC721) returns (string memory){
        return super.tokenURI(tokenId);
    }

    function getTime() public view returns(uint){
        return block.timestamp-_startTime;
    }


}
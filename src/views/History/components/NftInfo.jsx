import React, { useState } from 'react';
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { Modal } from 'antd';
import './index.scss';
import { CONTRACT_ADDRESS } from 'utils/constant';

const NftInfo = ({ tokenId }) => {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data, isLoading } = useContractRead(contract, "getNFTInfo", [tokenId]);

  const parseBigNumber = (value) => {
    return value ? value.toString() : "";
  };

  return (
    <>
      {!isLoading && data && (
         <div className="w-full h-100 p-3 flex flex-col 
         gap-1 rounded-2xl 
         drop-shadow-lg history-table"
         >
        <div className="flex flex-row gap-4 items-center h-16">
        <div className="">Renter: {parseBigNumber(data[0])}</div>
          <div className="">Room ID: {parseBigNumber(data[2])}</div>
          <div className="">Price: {parseBigNumber(data[3])}</div>
          <div className="">Price: {parseBigNumber(data[4])}</div>
        </div>
        </div>
      )}
    </>
  );
};

export default NftInfo;

import { FC, memo, useCallback, useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import deviceService from 'apis/services/deviceService';
import socket from 'utils/socket';
import roomService from 'apis/services/roomService';
import { useParams } from 'react-router-dom';
interface RFIDProps {
    title?: string;
    icon?: any;
    roomId: number,
    address: string,
}

const RFID: FC<RFIDProps> = ({ title = '', icon = <></>, roomId, address }) => {
    const [currentState, setCurrentState] = useState(-1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayText, setDisplayText] = useState('None');
    const [rfidStatus, setRfidStatus] = useState(false);

    const scanRFID = useCallback(async () => {
        try {
            const response = await roomService.scanRfid(roomId, address);
            setCurrentState(response?.data);
            if (response?.data?.result) {
                setRfidStatus(!rfidStatus);
            }
 
        } catch (error) {
            console.log(error);
        }
    }, [roomId, address, rfidStatus]);

    const checkLatestRFID = useCallback(async () => {
        try {
            const response = await deviceService.getLatestValue('room-access');
            setRfidStatus(response?.data.value);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        checkLatestRFID();
    }, [checkLatestRFID]);

    useEffect(() => {
        socket.on('receive_data', (receivedFeed, receivedValue, receivedTs) => {
            if (receivedFeed === 'room-access') {
                if (receivedValue) {
                    setRfidStatus(!rfidStatus);
                }
                //console.log(dateFormat(receivedTs, DEFAULT_DATE_TIME_FORMAT));
            }
        });
    }, [rfidStatus]);
    // const checkRFIDScanningProgress = useCallback(async () => {
    //     try {
    //         const response = await deviceService.getLatestValue('room-access');
    //         setCurrentState(response?.data.value);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, []);
    // // Check finger scanning progress every 5 seconds
    // useEffect(() => {
    //     const interval = setInterval(checkRFIDScanningProgress, 5000);
    //     return () => clearInterval(interval);
    // });

    useEffect(() => {
        // if (currentState === 1) {
        //     setDisplayText('Correct card! Please enter!');
        // } else if (currentState === 0) {
        //     setDisplayText('Wrong card! Please try again!');
        // } else {
        //     setDisplayText('No card scanned!');
        // }
        if (rfidStatus) {
            setDisplayText('Door unlocked!');
        }
        else { 
            setDisplayText('Door locked!');
        }
    }, [rfidStatus]);
    return (
        <div className="dashboard-card">
            <div className="dashboard-card__title">
                {title}
                <span className="dashboard-card__icon">{icon}</span>
            </div>
            <div className="dashboard-card__timestamp">{displayText}</div>
            <div className="dashboard-card__value">
                {
                    //If IDLE then show a button to start scanning
                    currentState === -1 ? (
                        <Button
                            style={{ backgroundColor: '#0000ff' }}
                            block
                            type="primary"
                            onClick={() => {
                                scanRFID();
                                setIsModalOpen(true);
                            }}
                        >
                            Scan
                        </Button>
                    ) : (
                        //If SCANNING then show a button to stop scanning
                        <Button
                            style={{ backgroundColor: '#0000ff' }}
                            block
                            type="primary"
                            onClick={() => setCurrentState(-1)}
                        >
                            Stop
                        </Button>
                    )
                }
            </div>
            {/* Modal to wait for scanning, when last value of finger is scanned then show a button to close modal */}
            <Modal
                open={isModalOpen}
                // onCancel={() => setCurrentState(-1)}
                footer={null}
                closable={false}
                centered
            >
                <div className="dashboard-card__value">
                    <h3>{displayText}</h3>
                    <Button
                        style={{ backgroundColor: '#0000ff' }}
                        block
                        type="primary"
                        onClick={() => {
                            setIsModalOpen(false);
                        }}
                    >
                        Close
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

RFID.defaultProps = {};
export default memo(RFID);

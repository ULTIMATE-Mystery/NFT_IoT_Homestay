import { FC, memo, useCallback, useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import deviceService from 'apis/services/deviceService';
import socket from 'utils/socket';
import roomService from 'apis/services/roomService';

interface RFIDProps {
    title?: string;
    icon?: any;
    roomId: number,
    address: string,
}

const RFID: FC<RFIDProps> = ({ title = '', icon = <></>, roomId, address }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayText, setDisplayText] = useState('None');
    const [modalText, setModalText] = useState('Please move your card near the reader...');
    const [rfidStatus, setRfidStatus] = useState(false);
    const scanRFID = useCallback(async () => {
        try {
            const response = await roomService.scanRfid(roomId, address);
            setModalText(response?.data?.result === 0 ? 'Scan failed!' : 'Door unlocked!')
            if (response?.data?.result) {
                setRfidStatus(true);
            }
 
        } catch (error) {
            console.log(error);
        }
    }, [roomId, address]);

    const checkLatestRFID = useCallback(async () => {
        try {
            const response = await deviceService.getLatestValue('room-access');
            setRfidStatus(response?.data?.value === '0' ? false : true);
            
        } catch (error) {
            console.log(error);
            setModalText('Error occurred!');
        }
    }, []);

    useEffect(() => {
        checkLatestRFID();
    }, [checkLatestRFID]);

    useEffect(() => {
        socket.on('receive_data', (receivedFeed, receivedValue, receivedTs) => {
            if (receivedFeed === 'room-access') {
                if (receivedValue === 0) {
                    setRfidStatus(false);
                }
                //console.log(dateFormat(receivedTs, DEFAULT_DATE_TIME_FORMAT));
            }
        });
    }, [rfidStatus]);


    useEffect(() => {
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
            <Button
                style={{ backgroundColor: !rfidStatus ? '#0000ff' : '#111', color: !rfidStatus ? 'white' : 'lightgray' }}
                block
                type="primary"
                onClick={() => {
                    scanRFID();
                    setIsModalOpen(true);
                    setModalText('Please move your card near the reader...');
                }}
                disabled={rfidStatus}
            >
                {!rfidStatus ? 'Scan card' : 'Unlocked'}
            </Button>
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
                    <h4>{modalText}</h4>
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

export default memo(RFID);

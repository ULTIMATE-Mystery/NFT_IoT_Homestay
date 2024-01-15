import { FC, memo, useCallback, useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import deviceService from 'apis/services/deviceService';
interface RFIDProps {
    title?: string;
    icon?: any;
}

const RFID: FC<RFIDProps> = ({ title = '', icon = <></> }) => {
    const [currentState, setCurrentState] = useState(-1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayText, setDisplayText] = useState('None');
    const scanRFID = useCallback(async () => {
        try {
            const response = await deviceService.scanRFID();
            setCurrentState(response?.data);
        } catch (error) {
            console.log(error);
        }
    }, []);
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
        if (currentState === 1) {
            setDisplayText('Correct card! Please enter!');
        } else if (currentState === 0) {
            setDisplayText('Wrong card! Please try again!');
        } else {
            setDisplayText('No card scanned!');
        }
    }, [currentState]);
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

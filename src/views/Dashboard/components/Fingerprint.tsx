import { FC, memo, useCallback, useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import deviceService from 'apis/services/deviceService';
interface FingerprintProps {
    title?: string;
    icon?: any;
}

const Fingerprint: FC<FingerprintProps> = ({ title = '', icon = <></> }) => {
    const [currentState, setCurrentState] = useState('IDLE');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayText, setDisplayText] = useState('None');
    const publishFingerData = useCallback(async (value: any) => {
        try {
            const response = await deviceService.publishData('finger', value);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }, []);
    const checkFingerScanningProgress = useCallback(async () => {
        try {
            const response = await deviceService.getLatestValue('finger');
            setCurrentState(response?.value);
        } catch (error) {
            console.log(error);
        }
    }, []);
    // Check finger scanning progress every 5 seconds
    useEffect(() => {
        const interval = setInterval(checkFingerScanningProgress, 5000);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        if (currentState === 'WELCOME 0 FROM REACT WEB') {
            setDisplayText('Scanned');
        }
    }, [currentState]);
    return (
        <div className="dashboard-card">
            {' '}
            <div className="dashboard-card__title">
                {title}
                <span className="dashboard-card__icon">{icon}</span>
            </div>
            <div className="dashboard-card__timestamp">{displayText}</div>
            <div className="dashboard-card__value">
                {
                    //If IDLE then show a button to start scanning
                    currentState === 'IDLE' ? (
                        <Button
                            style={{ backgroundColor: '#0000ff' }}
                            block
                            type="primary"
                            onClick={() => {
                                setCurrentState('SCANNING');
                                publishFingerData('SCANNING');
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
                            onClick={() => setCurrentState('IDLE')}
                        >
                            Stop
                        </Button>
                    )
                }
            </div>
            {/* Modal to wait for scanning, when last value of finger is scanned then show a button to close modal */}
            <Modal
                open={isModalOpen}
                onCancel={() => setCurrentState('IDLE')}
                footer={null}
                closable={false}
                centered
            >
                <div className="dashboard-card__value">
                    <h3>
                        {currentState === 'WELCOME 0 FROM REACT WEB' &&
                            'Welcome user'}
                        {currentState === 'SCANNING' &&
                            'Please put your finger on the scanner'}
                        {currentState === 'CHECK FAIL' && 'Unknown user'}
                    </h3>
                    <Button
                        style={{ backgroundColor: '#0000ff' }}
                        block
                        type="primary"
                        onClick={() => {
                            setCurrentState('IDLE');
                            publishFingerData('IDLE');
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

Fingerprint.defaultProps = {};
export default memo(Fingerprint);

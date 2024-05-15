import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined, WalletOutlined } from '@ant-design/icons';
import { useAddress } from '@thirdweb-dev/react';
import { Button, Form, Input, Modal, Steps } from 'antd';
import roomService from 'apis/services/roomService';
import { memo, FC, useState, useEffect, useCallback } from 'react';

interface RegisterModalProps {
    open: boolean;
    roomData: {
        RoomID: number;
        RoomName: string;
        RoomStatus: string;
        RoomDescription: string;
    };
}

const RegisterModal: FC<RegisterModalProps> = ({ open, roomData }) => {
    const address = useAddress();
    const [isInstructionOpen, setIsInstructionOpen] = useState(false);
    const [registerStatus, setRegisterStatus] = useState('LOAD'); // LOAD, SUCCESS, FAIL
    const [registeredWalletAddress, setRegisteredWalletAddress] = useState('');
    const [registerStep, setRegisterStep] = useState(-1);

    console.log('address', address);
    const handleFinish = useCallback(async (step: number, values: any) => {
        if (step === 0) {
            setRegisteredWalletAddress(values?.walletAddress);
            //setIsCurrentStepValid(true);
            setRegisterStep(1);
        }
        else if (step === 1) {
            // Write to card
            const response = await roomService.registerRfid(roomData.RoomID, values?.walletAddress);
            if (response?.data?.result === 1) {
                setRegisterStatus('SUCCESS');
            }
            else {
                setRegisterStatus('FAIL');
            }

        }

    }, [roomData.RoomID]);
  

    useEffect(() => {
        if (registerStep === 1) {
            handleFinish(1, { walletAddress: registeredWalletAddress });
        }
    }, [registerStep, registeredWalletAddress, handleFinish])
    const [isShowingAddress, setIsShowingAddress] = useState(false);
    return (
        <Modal 
            open={open} 
            centered
            //okText={registerStep < 0 ? "Start register" : registerStep === 2 ? "Finish" : "Next"}
            cancelText="Go back"
            closeIcon={null}
            keyboard={false}
            footer={[
                <Button 
                    key="back" 
                    disabled={(registerStatus === 'LOAD' && registerStep === 1) || registerStep === -1}
                    onClick={() => {
                        setRegisterStep(Math.max(registerStep - 1, -1))
                    }}
                >
                    Go back
                </Button>,
                registerStep < 0 && (
                    
                    <Button key="start" type="primary"
                        onClick={() => {
                            if (registerStep < 0) {
                                setRegisterStep(0);
                            }
                        }}
    
                    >
                        Start register
                        {/* {registerStep < 0 ? "Start register" : registerStep === 2 ? "Finish" : "Next"} */}
                    </Button>
                    ),
                registerStep === 0 && (
                    
                <Button key="submit" type="primary" htmlType='submit'
                    form="register-form"
                    onClick={() => {
                        if (registerStep < 0) {
                            setRegisterStep(0);
                        }
                    }}

                >
                    Next
                    {/* {registerStep < 0 ? "Start register" : registerStep === 2 ? "Finish" : "Next"} */}
                </Button>
                ),

                registerStep > 0 && (
                    <Button key="submit" type="primary"
                        disabled={registerStatus === 'LOAD'}
                        onClick={() => {
                            if (registerStep === 1) {
                                if (registerStatus === 'SUCCESS') {
                                    setRegisterStep(2);
                                }
                                else if (registerStatus === 'FAIL') {
                                    setRegisterStatus('LOAD');
                                    handleFinish(1, { walletAddress: registeredWalletAddress });
                                }
                            }
                            else if (registerStep === 2) {
                                // navigate('/iot/dashboard/' + roomData.RoomID);
                                //reload page
                                window.location.reload();
                                //getNFTInfo => lấy roomId, owner
                            }
                        }}
                        
                    >
                        { registerStatus === 'FAIL' ? "Retry" : registerStep === 2 ? "Finish" : "Next"}
                    </Button>
                )
            ]}
        >
        <div style={{fontSize: '18px', fontWeight: 600, marginBottom: '8px'}}>
            ACCESS PERMISSION REQUIRED FOR {roomData?.RoomName.toUpperCase()}
        </div>
        {registerStep < 0 ? (
            <>
                <p>If you have booked this room, please register your access permission to use the dashboard.</p>
                <div 
                    style={{color: 'blue', cursor: 'pointer', margin: '6px 0'}} 
                    className="hover:underline" 
                    onClick={() => setIsInstructionOpen(!isInstructionOpen)}
                >
                    {!isInstructionOpen ? "Show me how to do it" : "Hide instructions"}
                </div>
                
                <div style={{ display: isInstructionOpen ? 'block' : 'none', transition: 'display 1s'}}>
                    <div>1. Check your wallet address on the input and click "Next" button.</div>
                    <div>2. Start moving your RFID card near the reader (If you have not got the card, please contact the receptionist where you checked-in).</div> 
                    <div>3. After writing success, click on "Finish" button. Now you can access our smart dashboard feature. Enjoy your trip!</div>
                </div>
            </>
        ): (
            <>
                <Steps 
                    size="small"
                    current={registerStep}
                    items={[
                        {
                            title: "Get wallet address",
                        },
                        {
                            title: "Write to card",
                        },
                        {
                            title: "Finish",
                        },
                    ]}
                    style={{ marginBottom: '24px' }}
                />
                {registerStep === 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div>This is the wallet address that you have used to book this room.
                            <div 
                                onClick={() => {
                                    setRegisteredWalletAddress(address || '');
                                    setIsShowingAddress(!isShowingAddress);
                                }}
                                style={{color: 'blue', cursor: 'pointer'}}
                            >
                                {' '}The address is not appear?
                            </div>
                            {isShowingAddress && <div>Your address is <span style={{ fontWeight: 600 }}>{address}</span></div>}
                        </div>
                        <Form 
                            id="register-form"
                            onFinish={values => handleFinish(registerStep, values)}
                            initialValues={{ walletAddress: address || registeredWalletAddress }}
                        >
                            <Form.Item 
                                name="walletAddress" 
                                rules={[{ required: true, message: 'Please input your wallet address!' }]}
                                
                            >
                            <Input 
                                placeholder="Enter your wallet address" 
                                size="large" 
                                required 
                                autoFocus 
                                readOnly
                                prefix={<WalletOutlined />}
                                //defaultValue={registeredWalletAddress}
                                //value={registeredWalletAddress}
                                onChange={e => setRegisteredWalletAddress(e.target.value)} 
                            />
                            </Form.Item>
                        </Form>

                    </div>
                )}
                {registerStep === 1 && (
                    <div className="flex flex-col items-center gap-[8px]">
                        {registerStatus === 'LOAD' ? (
                            <>
                        <LoadingOutlined style={{fontSize: 40}}/>
                        <div >Please move your card near the reader...</div>
                        </>
                        ) : (
                            <>
                                {registerStatus === 'SUCCESS' ? (
                                    <div className="flex flex-col items-center gap-[8px]">
                                        <CheckCircleOutlined style={{color: 'green', fontSize: '40px'}} />
                                        <div style={{color: 'green'}}>Register success!</div>   
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-[8px]">
                                    <CloseCircleOutlined style={{color: 'red', fontSize: '40px'}} />
                                    <div style={{color: 'red'}}>Register fail! Please try again.</div>
                                    </div>
                                )}
                            </>
                        )}

                    </div>
                )}
                {
                    registerStep === 2 && (
                        <div className="flex flex-col items-center gap-[8px]">
                            <CheckCircleOutlined style={{color: 'green', fontSize: '40px'}} />
                            <div style={{color: 'green'}}>Register success! Click on Finish button to see the dashboard.</div>
                        </div>
                    )
                }
            </>
        )}
    </Modal>
    );

};

RegisterModal.displayName = 'RegisterModal';

export default memo(RegisterModal);
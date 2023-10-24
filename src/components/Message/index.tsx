import { notification } from "antd";

const defaultMessageDuration = {
    info: 7,
    success: 3,
    warning: 10,
    error: 12,
};

class Message {
    public static sendSuccess = (
        message: string | undefined,
        duration: number = defaultMessageDuration.success
    ) => {
        notification["success"]({
            message: message,
            duration: duration,
        });
    };

    public static sendInfo = (
        message: string | undefined,
        duration: number = defaultMessageDuration.info
    ) => {
        notification["info"]({
            message: message,
            duration: duration,
        });
    };

    public static sendWarning = (
        message: string | undefined,
        duration: number = defaultMessageDuration.warning
    ) => {
        notification["warning"]({
            message: message,
            duration: duration,
        });
    };

    public static sendError = (
        message: string | undefined,
        duration: number = defaultMessageDuration.error
    ) => {
        notification["error"]({
            message: message,
            duration: duration,
        });
    };
}

export default Message;

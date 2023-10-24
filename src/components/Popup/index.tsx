import { Modal } from 'antd';

class Popup {
    public static sendSuccess = (
        title: string | undefined,
        content: string | undefined,
        { ...props }
    ) => {
        Modal.success({
            title: title,
            content: content,
            ...props,
        });
    };
    public static sendError = (
        title: string | undefined,
        content: string | undefined,
        { ...props }
    ) => {
        Modal.error({
            title: title,
            content: content,
            ...props,
        });
    };
    public static sendWarning = (
        title: string | undefined,
        content: string | undefined,
        { ...props }
    ) => {
        Modal.warning({
            title: title,
            content: content,
            ...props,
        });
    };
    public static sendInfo = (
        title: string | undefined,
        content: string | undefined,
        { ...props }
    ) => {
        Modal.info({
            title: title,
            content: content,
            ...props,
        });
    };
    public static sendConfirm = (
        title: string | undefined,
        content: string | undefined,
        onOk: () => void,
        onCancel: () => void,
        { ...props }
    ) => {
        Modal.confirm({
            title: title,
            content: content,
            onOk: onOk,
            onCancel: onCancel,
            ...props,
        });
    };
}

export default Popup;

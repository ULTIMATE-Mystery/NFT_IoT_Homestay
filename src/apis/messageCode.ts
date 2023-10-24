const messageCodes = {
    SUCCESS: 'Success',
    CONTACT_ADMIN_FOR_SUPPORT:
        'Có lỗi xảy ra. Vui lòng liên hệ quản trị viên để được hỗ trợ',

    VALIDATION_ERROR: 'Dữ liệu không hợp lệ',
    PARSE_ERROR: 'Dữ liệu không hợp lệ',
    AUTHENTICATION_FAILED: 'Đăng nhập thất bại',
    NOT_AUTHENTICATED: 'Bạn chưa đăng nhập',
    NOT_FOUND: 'Không tìm thấy dữ liệu',

    EXPIRED_SESSION: 'Phiên đăng nhập đã hết hạn',
    PAGE_NOT_FOUND: 'Chức năng này hiện không khả dụng',
    SERVER_ERROR: 'Có lỗi xảy ra. Vui lòng thử lại sau',
    PERMISSION_DENIED: 'Bạn không có quyền thực hiện chức năng này',
    USER_DOES_NOT_HAVE_PERMISSIONS:
        'Bạn không có quyền thực hiện chức năng này',

    INVALID_FIELD: 'Dữ liệu không hợp lệ',

    CURRENT_PASSWORD_NOT_MATCH: 'Mật khẩu hiện tại không chính xác',
    USER_WITH_USERNAME_NOT_EXISTED:
        'Tài khoản không tồn tại hoặc đã bị khóa. Vui lòng liên hệ quản trị viên để được hỗ trợ',
    INVALID_OR_EXPIRED_TOKEN: 'Phiên đăng nhập đã hết hạn',
    MISSING_ACCESS_TOKEN: 'Bạn cần đăng nhập để thực hiện chức năng này',
    NOT_FOUND_USER_DEVICE_TOKEN: 'Phiên đăng nhập đã hết hạn',
    USER_ACTIVATION_NOT_FOUND: 'Mã kích hoạt không tồn tại',
    INVALID_USERNAME_OR_PASSWORD: 'Tên đăng nhập hoặc mật khẩu không chính xác',
    ITEM_VALUE_INVALID: 'Dữ liệu không hợp lệ',
    EMAIL_ALREADY_EXIST: 'Email đã tồn tại',

    default: 'Có lỗi xảy ra... Vui lòng thử lại',
} as {
    [key: string]: string;
};

export default messageCodes;

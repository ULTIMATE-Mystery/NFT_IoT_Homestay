import { memo } from 'react';
import Inner from 'views/Login/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});
Wrapper.displayName = 'Login';

const Login = Wrapper;

export default Login;

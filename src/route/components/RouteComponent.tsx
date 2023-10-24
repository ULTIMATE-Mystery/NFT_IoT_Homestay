// NOT FINISHED YET

import { FC, memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, setToken } from 'reducers/token/action';
import userService from 'apis/services/userService';
import { dispatch } from 'store/Store';
import { userActions } from 'reducers/user';
import routeConstants from 'route/routeConstants';

interface IProps {
    authorization?: boolean;
    path: string;
}

const RouteComponent: FC<IProps> = memo(({ authorization, path }) => {
    const [authorized, setAuthorized] = useState(false);
    const navigateTo = useNavigate();
    const token = getToken();
    useEffect(() => {
        if (!authorized) {
            if (authorization) {
                if (token) {
                    userService.me().then(res => {
                        if (res.isSuccess) {
                            setAuthorized(true);
                            dispatch(userActions.INIT_USER(res.data));
                        } else {
                            setToken('');
                            setAuthorized(false);
                            navigateTo(routeConstants.LOGIN);
                        }
                    });
                } else {
                    setAuthorized(false);
                    navigateTo(routeConstants.LOGIN);
                }
            } else {
                setAuthorized(true);
            }
        } else if (authorization && !token) {
            setAuthorized(false);
            navigateTo(routeConstants.LOGIN);
        }
    }, [authorization, authorized, navigateTo, token]);

    if (!authorized) {
        return null;
    }
    navigateTo(path);
    return <></>;
});

RouteComponent.displayName = 'RouteComponent';

export default RouteComponent;

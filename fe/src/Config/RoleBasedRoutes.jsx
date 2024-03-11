// PrivateRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ErrorPage from '../Pages/errorPage';
import getUser from './auth';

import Spin from '../Components/UI/spin'



const PrivateRoute = ({ children, requiredRoles }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const resObject = await getUser();
            setUser(resObject.user);
            setIsLoading(false);
            localStorage.setItem('success', JSON.stringify(resObject.isAuthenticated));
            setIsAuth(localStorage.getItem('success') === 'true');
        };
        fetchUser();
    }, [isAuth]);

    if (isLoading) {
        return <Spin />; // Or your loading spinner
    }

    if (user?.role && !requiredRoles?.some((r) => user?.role === r)) {
        return <ErrorPage />;
    }

    return isAuth ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;

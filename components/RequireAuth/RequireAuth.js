import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
// import { useLocation, Navigate } from "react-router-dom";
import auth from '../../firebase.init';
import Loading from '../Loading/Loading';

const RequireAuth = ({ children }) => {
    // let location = useLocation();
    let router = useRouter();
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <Loading />
    }
    if (!user) {
        // return <Navigate to="/login" state={{ from: location }} replace />;
        router.push('/login');
    }
    return children;
};

export default RequireAuth;
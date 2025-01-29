import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/loginUserSlice';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Perform logout logic here, e.g., clearing auth tokens
        // localStorage.clear();

        dispatch(logout());

        // Redirect to login or home page
        navigate('/login');
    }, [navigate, dispatch]);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-200">
            <p className="text-xl text-gray-700">You have been logged out. Redirecting...</p>
        </div>
    );
};

export default Logout;

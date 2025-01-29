// import React from 'react';
// // import { toast } from 'react-toastify';
// // import { useEffect } from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//     // const location = useLocation();
//     // const navigate = useNavigate();

//     // useEffect(() => {
//     //     if (location.state && location.state.toastMessage) {
//     //         // Display the toast message
//     //         toast.success(location.state.toastMessage);

//     //         // Clear the state after showing the toast
//     //         navigate(location.pathname, { replace: true });
//     //     }
//     // }, [location, navigate]);

//     return (
//         <div style={{ textAlign: 'center', fontSize: '24px' }}>Welcome to Dashboard</div>
//     );
// };

// export default Dashboard;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useApiClient } from '../api/ApiService'; // Import the apiClient from ApiService

// const Dashboard = () => {
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const apiClient = useApiClient(); // Use the apiClient
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         navigate('/logout');
//     };

//     const fetchEvents = async () => {
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await apiClient.get('/api/events/'); // Use the apiClient to fetch events
//             setEvents(response.data.results); // Assuming response structure is as mentioned
//         } catch (error) {
//             console.log(error);
            
//             setError('Failed to fetch events');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
//             <header className="text-center mb-8">
//                 <h1 className="text-4xl font-bold text-blue-600">Welcome to the Dashboard</h1>
//             </header>
//             <main className="text-center space-y-4">
//                 <p className="mb-6 text-lg text-gray-700">This is your central hub for managing your content and activities.</p>
//                 <div className="flex flex-col items-center">
//                 <button
//                     onClick={fetchEvents}
//                     className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
//                 >
//                     Fetch Events
//                 </button>

//                 <button
//                 onClick={handleLogout}
//                     className="mt-6 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
//                 >
//                     Logout
                    
//                 </button>
//                 </div>

//                 {loading && <p className="text-lg text-gray-600 mt-4">Loading...</p>}
//                 {error && <p className="text-lg text-red-500 mt-4">{error}</p>}

//                 {events.length > 0 && (
//                     <div className="mt-6 space-y-4">
//                         {events.map((event) => (
//                             <div key={event.data.id} className="bg-white p-4 rounded-lg shadow-md">
//                                 <h3 className="text-xl font-semibold text-blue-600">{event.data.title}</h3>
//                                 <p className="text-gray-700">{event.data.description}</p>
//                                 <p className="text-sm text-gray-500">Start: {new Date(event.data.start_datetime).toLocaleString()}</p>
//                                 <p className="text-sm text-gray-500">End: {new Date(event.data.end_datetime).toLocaleString()}</p>
//                                 <p className="text-sm text-gray-500">Location: {event.data.location}</p>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import the useSelector hook to check authentication
import { useApiClient } from '../api/ApiService'; // Import the apiClient from ApiService
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const apiClient = useApiClient(); // Use the apiClient
    const navigate = useNavigate();
    
    // Get the token from the Redux state (or wherever you store it)
    const token = useSelector((state) => state.loginUser.user?.data?.auth_token);

    useEffect(() => {
        // If the token is not present, redirect to login page
        if (!token) {
            navigate('/login');
            toast.error('Please log in to access the dashboard.');
        }
    }, [token, navigate]);

    const handleLogout = () => {
        navigate('/logout');
    };

    const fetchEvents = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiClient.get('/api/events/'); // Use the apiClient to fetch events
            setEvents(response.data.results); // Assuming response structure is as mentioned
        } catch (error) {
            console.log(error);
            setError('Failed to fetch events');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-600">Welcome to the Dashboard</h1>
            </header>
            <main className="text-center space-y-4">
                <p className="mb-6 text-lg text-gray-700">This is your central hub for managing your content and activities.</p>
                <div className="flex flex-col items-center">
                    <button
                        onClick={fetchEvents}
                        className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                    >
                        Fetch Events
                    </button>

                    <button
                        onClick={handleLogout}
                        className="mt-6 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                    >
                        Logout
                    </button>
                </div>

                {loading && <p className="text-lg text-gray-600 mt-4">Loading...</p>}
                {error && <p className="text-lg text-red-500 mt-4">{error}</p>}

                {events.length > 0 && (
                    <div className="mt-6 space-y-4">
                        {events.map((event) => (
                            <div key={event.data.id} className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold text-blue-600">{event.data.title}</h3>
                                <p className="text-gray-700">{event.data.description}</p>
                                <p className="text-sm text-gray-500">Start: {new Date(event.data.start_datetime).toLocaleString()}</p>
                                <p className="text-sm text-gray-500">End: {new Date(event.data.end_datetime).toLocaleString()}</p>
                                <p className="text-sm text-gray-500">Location: {event.data.location}</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
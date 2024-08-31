import React, { useEffect, useState } from 'react';

const HomePage = () => {
    const [tokensUsed, setTokensUsed] = useState(0); // State for tokens used
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    const circleStyle = {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        backgroundColor: '#D1E9F6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
    };

    const squareStyle = {
        width: '150px',
        height: '150px',
        backgroundColor: '#D1E9F6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
    };

    // Function to fetch tokens used from the API
    const fetchTokensUsed = async () => {
        try {
            // Get the token from localStorage
            const token = localStorage.getItem('authToken');

            const response = await fetch('https://happys-i6rs.onrender.com/api/user/tokens', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
                credentials: 'include', // Include credentials for session authentication if needed
            });

            if (!response.ok) {
                throw new Error('Failed to fetch tokens used');
            }

            const data = await response.json();
            setTokensUsed(data.tokensUsed); // Update state with the tokens used
        } catch (error) {
            setError(error.message); // Set error message
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    // Fetch tokens used when the component mounts
    useEffect(() => {
        fetchTokensUsed();
    }, []);

    return (
        <>
            <div style={{ display: 'flex', marginTop: '120px' }}>
                <div style={{ margin: 'auto' }}>
                    <div style={circleStyle}>
                        {loading ? (
                            <h5>Loading...</h5>
                        ) : error ? (
                            <h5>Error: {error}</h5>
                        ) : (
                            <h5>{tokensUsed}</h5> // Display tokens used
                        )}
                    </div>
                    <h5>Token Used / Balance</h5>
                </div>
                <div style={{ margin: 'auto' }}>
                    <div style={circleStyle}></div>
                    <h5>Wallet Balance</h5>
                </div>
                <div style={{ margin: 'auto' }}>
                    <div style={circleStyle}></div>
                    <h5>Wallet Balance</h5>
                </div>
            </div>

            <div style={{ display: 'flex', marginTop: '150px' }}>
                <div style={{ marginLeft: '170px' }}>
                    <div style={squareStyle}>
                        <h6 style={{ fontWeight: 'bold' }}>Add A New Doc</h6>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;

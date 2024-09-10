import React, { useState } from 'react';

function UploadCSV() {
    const [message, setMessage] = useState('');

    // For now, this function is not functional. It's just a placeholder.
    const handleInvokeLambda = () => {
        setMessage("This feature is currently disabled for non-admins.");
    };

    return (
        <div>
            <button onClick={handleInvokeLambda} style={styles.adminButton}>
                Import CSV (Admin Only)
            </button>
            <p>{message}</p>
        </div>
    );
}

// Styles for the admin-only button (non-functional)
const styles = {
    adminButton: {
        backgroundColor: '#cccccc',  // Muted color for button
        color: '#333',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'not-allowed',  // Disabled cursor
        fontWeight: 'bold',
    }
};

export default UploadCSV;

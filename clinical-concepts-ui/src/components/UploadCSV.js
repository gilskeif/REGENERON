/**
 * This component is responsible for handling the CSV file upload functionality for
 * Admin users. It triggers an AWS Lambda function that processes the CSV file.
 * The component allows for invoking the Lambda function via HTTPS requests only,
 * ensuring secure communication.
 *
 * Current Implementation Notes:
 * - The CSV file upload is initiated by clicking the "Import CSV" button. This is only
 *   available to Admin users, as specified by the role-based access in the parent component.
 * - The `handleInvokeLambda` function makes a request to the HTTPS endpoint to invoke
 *   the Lambda function.
 * - The filename (`clinical_concepts.csv`) is hardcoded, which works for this demo.
 *   In a production scenario, a file selection mechanism could be implemented to allow
 *   dynamic uploads of different CSV files.
 *
 * Security Considerations:
 * - HTTPS is used to ensure secure communication between the client and server, protecting
 *   sensitive data from interception or tampering.
 * - The current implementation lacks any form of authentication or authorization when
 *   invoking the Lambda function. In production, this should be replaced with proper
 *   authentication using AWS IAM roles, signed requests, or token-based authentication
 *   (e.g., via AWS Cognito).
 * - Additional error handling could be implemented to better handle different failure cases,
 *   such as network issues or server timeouts.
 */

import React, { useState } from 'react';
import axios from 'axios';

function UploadCSV() {
    const [message, setMessage] = useState('');  // Message to display the result of the import
    const [loading, setLoading] = useState(false);  // Loading state to show the user when the import is happening

    const apiHttpsUrl = 'https://elxn8th1ad.execute-api.us-east-2.amazonaws.com/prod/CSVImportFunction'; // HTTPS endpoint for Lambda function

    /**
     * Function to trigger the Lambda function for CSV import.
     * Invokes the Lambda function over HTTPS to ensure secure communication.
     */
    const handleInvokeLambda = async () => {
        setLoading(true);  // Set loading state to true while the request is being processed
        setMessage('');    // Clear any previous messages

        try {
            // Invoke the Lambda function using HTTPS
            let response = await axios.post(apiHttpsUrl, {
                filename: 'clinical_concepts.csv'  // Hardcoded CSV filename for demo purposes
            });

            if (response.status === 200) {
                setMessage('CSV file has been successfully imported via HTTPS!');  // Success message for HTTPS request
            } else {
                console.error('Unexpected response:', response);
                setMessage('Unexpected response from the server.');  // Handle unexpected server responses
            }
        } catch (error) {
            console.error('HTTPS request failed:', error);  // Log the failure of the HTTPS request
            setMessage('HTTPS request failed.');  // Display a message if the HTTPS request fails
        } finally {
            setLoading(false);  // Reset loading state once the request process is complete
        }
    };

    return (
        <div>
            {/* Button to trigger the Lambda function. Disabled while loading. */}
            <button onClick={handleInvokeLambda} style={styles.adminButton} disabled={loading}>
                {loading ? 'Importing CSV...' : 'Import CSV (Admin Only)'}  {/* Loading text shown during CSV import */}
            </button>
            <p>{message}</p>  {/* Display message to the user based on the result of the import */}
        </div>
    );
}

// Styles for the admin-only button
const styles = {
    adminButton: {
        backgroundColor: '#4CAF50',  // Green background to indicate an action button
        color: '#fff',               // White text for contrast
        padding: '10px 20px',        // Padding for the button to make it larger and easier to click
        borderRadius: '5px',         // Rounded corners for a modern look
        border: 'none',              // No border
        cursor: 'pointer',           // Pointer cursor to indicate that the button is clickable
        fontWeight: 'bold',          // Bold text to emphasize the button's importance
    }
};

export default UploadCSV;

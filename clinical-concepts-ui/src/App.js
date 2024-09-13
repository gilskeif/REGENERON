/**
 * This module is the main application for managing Clinical Concepts. It includes
 * functionality for fetching, searching, sorting, adding, editing, and deleting
 * concepts. Additionally, it demonstrates how to manage user roles (admin, editor,
 * viewer) with placeholder authentication logic for demo purposes.
 *
 * Current Authentication Approach:
 * - The authentication logic uses a custom hook from `auth.js` to manage login, logout,
 *   and user role state.
 * - For demonstration purposes, authentication is performed using hardcoded users
 *   (admin, editor, viewer) with plain-text credentials.
 * - This authentication is NOT secure and is intended solely for demo purposes.
 *
 * Placeholder for Future SAML-based Authentication:
 * - In a production environment, the login form and hardcoded user logic should be replaced
 *   with real authentication using SAML (Security Assertion Markup Language).
 * - AWS Cognito could be used to manage user pools and authentication flows, ensuring
 *   secure login and session management.
 * - Role-based access (admin, editor, viewer) can be extracted from the SAML assertion
 *   and JWT tokens to provide proper security and access control.
 *
 * Notes:
 * - The current hardcoded user roles provide access control for adding/editing/deleting
 *   concepts (admin/editor) and importing CSV data (admin).
 * - The Lambda function trigger for CSV import is only accessible to users with the admin role.
 * - The `useAuth` hook handles all authentication state, but in a real-world scenario,
 *   this would be replaced by interaction with an external Identity Provider (IdP).
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadCSV from './components/UploadCSV';  // Component for uploading CSV
import { useAuth } from "./auth";  // Import the authentication logic

function App() {
    const { loggedIn, userRole, login, logout, error } = useAuth();  // Destructure authentication state and functions
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // State variables for managing concepts and user input
    const [concepts, setConcepts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newConcept, setNewConcept] = useState({ conceptId: "", displayName: "", description: "", alternateNames: "" });
    const [editConceptId, setEditConceptId] = useState(null);  // Tracks which concept is being edited
    const [searchTerm, setSearchTerm] = useState("");
    const [sortById, setSortById] = useState(false);  // Toggle for sorting concepts by ID

    /**
     * Fetches the concepts from the API once the user is logged in.
     * In production, this could also involve token-based authentication to secure the API request.
     */
    useEffect(() => {
        if (loggedIn) {
            fetchConcepts();
        }
    }, [loggedIn]);

    /**
     * Makes an API call to fetch the list of concepts.
     * In a production environment, this could involve attaching an authentication token
     * to the request header to verify the user's identity.
     */
    const fetchConcepts = () => {
        axios.get("https://8bv8slbpni.execute-api.us-east-2.amazonaws.com/prod/concepts")
            .then(response => {
                setConcepts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                setLoading(false);
            });
    };

    // Handles the search input and filters the displayed concepts based on search criteria
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Manages form input for adding/editing concepts
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewConcept(prevState => ({ ...prevState, [name]: value }));
    };

    /**
     * Adds a new concept via an API call. Only accessible to users with 'admin' or 'editor' roles.
     * In production, this request should be secured with proper authorization to ensure only
     * authorized users can add concepts.
     */
    const handleAddConcept = () => {
        axios.post("https://8bv8slbpni.execute-api.us-east-2.amazonaws.com/prod/concepts", newConcept)
            .then(() => {
                fetchConcepts();  // Refresh the list of concepts after adding
                setNewConcept({ conceptId: "", displayName: "", description: "", alternateNames: "" });  // Clear input fields
            })
            .catch(error => {
                console.error("Error adding concept: ", error);
            });
    };

    /**
     * Saves edits to an existing concept via an API call. Only accessible to users with 'admin' or 'editor' roles.
     * The request should be secured in production with authentication to prevent unauthorized edits.
     */
    const handleSaveConcept = () => {
        axios.put(`https://8bv8slbpni.execute-api.us-east-2.amazonaws.com/prod/concepts?conceptId=${editConceptId}`, newConcept)
            .then(() => {
                fetchConcepts();  // Refresh the list of concepts after editing
                setEditConceptId(null);  // Clear edit mode
                setNewConcept({ conceptId: "", displayName: "", description: "", alternateNames: "" });  // Clear input fields
            })
            .catch(error => {
                console.error("Error saving concept: ", error);
            });
    };

    /**
     * Deletes a concept by ID via an API call. Only accessible to users with 'admin' or 'editor' roles.
     * Production systems should ensure that only authorized users can delete concepts by implementing
     * secure authorization mechanisms.
     */
    const handleDeleteConcept = (conceptId) => {
        axios.delete(`https://8bv8slbpni.execute-api.us-east-2.amazonaws.com/prod/concepts?conceptId=${conceptId}`)
            .then(() => {
                fetchConcepts();  // Refresh the list of concepts after deletion
            })
            .catch(error => {
                console.error("Error deleting concept: ", error);
            });
    };

    // Prepares a concept for editing by populating the form with the existing values
    const handleEditConcept = (concept) => {
        setNewConcept(concept);
        setEditConceptId(concept.conceptId);
    };

    // Toggles the sorting order by concept ID
    const toggleSortById = () => {
        setSortById(!sortById);  // Toggle sorting direction
    };

    // Filters the concepts based on the search term entered by the user
    const filteredConcepts = concepts.filter(concept =>
        concept.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        concept.conceptId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        concept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        concept.alternateNames.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sorts the filtered concepts based on the concept ID, depending on the sorting order
    const sortedConcepts = [...filteredConcepts].sort((a, b) => {
        return sortById
            ? a.conceptId.localeCompare(b.conceptId)  // Ascending order
            : b.conceptId.localeCompare(a.conceptId); // Descending order
    });

    // If the user is not logged in, render the login form
    if (!loggedIn) {
        return (
            <div style={styles.container}>
                <h2>Login</h2>
                <form onSubmit={(e) => { e.preventDefault(); login(username, password); }}>
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.inputField}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.inputField}
                        />
                    </div>
                    <button type="submit" style={styles.loginButton}>Login</button>
                </form>
                {error && <p style={styles.error}>{error}</p>}
            </div>
        );
    }

    // Display loading state while concepts are being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={styles.container}>
            {/* Header section */}
            <div style={styles.header}>
                <div style={styles.logo}>
                    <span style={styles.logoText}>REGENERON</span>
                    <p style={styles.logoSubtext}>science to medicine®</p>
                </div>
                <h1 style={styles.title}>Master Ontology</h1>
                <h2 style={styles.subtitle}>Clinical Concepts Dataset</h2>
                <button onClick={logout} style={styles.logoutButton}>Logout</button>  {/* Add Logout button */}
            </div>

            {/* Search, Sort, and Add/Edit Concept section */}
            <div style={styles.controls}>
                <input
                    type="text"
                    placeholder="Search concepts by any field"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={styles.searchBar}
                />
                <button onClick={toggleSortById} style={styles.sortButton}>
                    Sort by ID {sortById ? "(Ascending)" : "(Descending)"}
                </button>
            </div>

            {/* Add/Edit Concept section (Visible for both Admin and Editor) */}
            {(userRole === "editor" || userRole === "admin") && (
                <div style={styles.formContainer}>
                    <h2>{editConceptId ? "Edit Concept" : "Add New Concept"}</h2>
                    <input
                        type="text"
                        name="conceptId"
                        placeholder="Concept ID"
                        value={newConcept.conceptId}
                        onChange={handleInputChange}
                        style={styles.inputField}
                        disabled={!!editConceptId}  // Disable conceptId input during editing
                    />
                    <input
                        type="text"
                        name="displayName"
                        placeholder="Display Name"
                        value={newConcept.displayName}
                        onChange={handleInputChange}
                        style={styles.inputField}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={newConcept.description}
                        onChange={handleInputChange}
                        style={styles.inputField}
                    />
                    <input
                        type="text"
                        name="alternateNames"
                        placeholder="Alternate Names"
                        value={newConcept.alternateNames}
                        onChange={handleInputChange}
                        style={styles.inputField}
                    />
                    <button onClick={editConceptId ? handleSaveConcept : handleAddConcept} style={styles.addButton}>
                        {editConceptId ? "Save Changes" : "Add Concept"}
                    </button>
                </div>
            )}

            {/* Import CSV button visible only to Admins */}
            {userRole === "admin" && (
                <div style={styles.formContainer}>
                    <h2>Admin Controls</h2>
                    <UploadCSV />  {/* This triggers the Lambda function for importing the CSV */}
                </div>
            )}

            {/* Concept list section */}
            <div style={styles.recordsSection}>
                <ul style={styles.listContainer}>
                    {sortedConcepts.length > 0 ? (
                        sortedConcepts.map(concept => (
                            <li key={concept.conceptId} style={styles.listItem}>
                                <h3>{concept.conceptId}</h3>  {/* Added Concept ID */}
                                <h2>{concept.displayName}</h2>
                                <p>{concept.description}</p>
                                <p>Alternate Names: {concept.alternateNames}</p>
                                {(userRole === "editor" || userRole === "admin") && (
                                    <>
                                        <button onClick={() => handleEditConcept(concept)} style={styles.editButton}>
                                            Edit
                                        </button>
                                        <button onClick={() => handleDeleteConcept(concept.conceptId)} style={styles.deleteButton}>
                                            Delete
                                        </button>
                                    </>
                                )}
                            </li>
                        ))
                    ) : (
                        <div>No concepts found</div>
                    )}
                </ul>
            </div>
        </div>
    );
}

// Style object for the UI elements
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundImage: 'linear-gradient(to bottom, #86b7e3, #f0f4f8)',
        color: '#333',
        height: '100vh',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    logo: {
        textAlign: 'left',
        position: 'absolute',
        top: '10px',
        left: '10px',
    },
    logoText: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#003366',
    },
    logoSubtext: {
        fontSize: '10px',
        color: '#cc6600',
        margin: 0,
    },
    title: {
        color: '#003366',
        fontSize: '36px',
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#666',
        fontSize: '18px',
    },
    controls: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: '20px',
    },
    searchBar: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        flex: '3',
        marginRight: '10px',
    },
    sortButton: {
        padding: '10px 20px',
        backgroundColor: '#004080',
        color: '#fff',
        borderRadius: '5px',
        cursor: 'pointer',
        border: 'none',
    },
    formContainer: {
        marginTop: '20px',
        textAlign: 'center',
    },
    inputField: {
        display: 'block',
        margin: '10px auto',
        padding: '10px',
        fontSize: '16px',
        width: '300px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    addButton: {
        padding: '10px 20px',
        backgroundColor: '#cccccc',
        color: '#333',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '20px',
    },
    recordsSection: {
        width: '80%',
        marginTop: '20px',
    },
    listContainer: {
        listStyleType: 'none',
        padding: '0',
    },
    listItem: {
        backgroundColor: '#fff',
        padding: '20px',
        marginBottom: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    editButton: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px',
    },
    deleteButton: {
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    logoutButton: {
        padding: '10px 20px',
        backgroundColor: '#ff6600',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        position: 'absolute',
        top: '20px',
        right: '20px',
    }
};

export default App;

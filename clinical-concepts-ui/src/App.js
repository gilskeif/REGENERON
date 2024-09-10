import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadCSV from './components/UploadCSV';  // Component for uploading CSV

function App() {
    const [concepts, setConcepts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newConcept, setNewConcept] = useState({ conceptId: "", displayName: "", description: "", alternateNames: "" });
    const [searchTerm, setSearchTerm] = useState("");
    const [sortById, setSortById] = useState(false);  // Toggle for sorting concepts by ID

    // Fetches concept data from API on component mount
    useEffect(() => {
        fetchConcepts();
    }, []);

    // Fetches concepts and sets them in the state
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

    // Handles search term input
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handles input for the "Add New Concept" box
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewConcept(prevState => ({ ...prevState, [name]: value }));
    };

    // Function to add a new concept (non-functional for now)
    const handleAddConcept = () => {
        // Placeholder: The add functionality is not yet implemented
        console.log("Add new concept functionality will be implemented here.");
    };

    // Toggle sorting by concept ID
    const toggleSortById = () => {
        setSortById(!sortById);  // Toggle sorting direction
    };

    // Filters concepts based on search term
    const filteredConcepts = concepts.filter(concept =>
        concept.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        concept.conceptId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        concept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        concept.alternateNames.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sorts filtered concepts by ID if toggle is on
    const sortedConcepts = sortById
        ? [...filteredConcepts].sort((a, b) => a.conceptId.localeCompare(b.conceptId))
        : filteredConcepts;

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
            </div>

            {/* Search, Sort, and Admin Button section */}
            <div style={styles.controls}>
                <input
                    type="text"
                    placeholder="Search concepts by any field"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={styles.searchBar}
                />
                <button onClick={toggleSortById} style={styles.sortButton}>
                    Sort by ID {sortById ? "(Descending)" : "(Ascending)"}
                </button>
                <UploadCSV /> {/* Admin button for uploading CSV */}
            </div>

            {/* Add New Concept section */}
            <div style={styles.formContainer}>
                <h2>Add New Concept</h2>
                <input
                    type="text"
                    name="conceptId"
                    placeholder="Concept ID"
                    value={newConcept.conceptId}
                    onChange={handleInputChange}
                    style={styles.inputField}
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
                <button onClick={handleAddConcept} style={styles.addButton}>Add Concept</button>
            </div>

            {/* Concept list section */}
            <div style={styles.recordsSection}>
                <ul style={styles.listContainer}>
                    {sortedConcepts.length > 0 ? (
                        sortedConcepts.map(concept => (
                            <li key={concept.conceptId} style={styles.listItem}>
                                <h2>{concept.displayName}</h2>
                                <p>{concept.description}</p>
                                <p>Alternate Names: {concept.alternateNames}</p>
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
        backgroundColor: '#f0f4f8',  // Soft blue-gray background
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
        color: '#003366',  // Darker blue for logo
    },
    logoSubtext: {
        fontSize: '10px',
        color: '#cc6600',  // Muted orange for subtext
        margin: 0,
    },
    title: {
        color: '#003366',  // Dark blue for main title
        fontSize: '36px',
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#666',  // Muted gray for subtitle
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
        flex: '1',
        marginRight: '10px',
    },
    sortButton: {
        padding: '10px 20px',
        backgroundColor: '#004080',  // Muted blue for the button
        color: '#fff',
        borderRadius: '5px',
        cursor: 'pointer',
        border: 'none',
        marginRight: '10px',
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
        backgroundColor: '#cccccc',  // Neutral button color
        color: '#333',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
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
};

export default App;

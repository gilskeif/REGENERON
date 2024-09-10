package com.example.clinicalconceptsapp;

public class User {
    private String username;
    private boolean isAdmin;  // true if the user is part of the Ontology team

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public boolean isAdmin() { return isAdmin; }
    public void setIsAdmin(boolean isAdmin) { this.isAdmin = isAdmin; }
}

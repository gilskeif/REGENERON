package com.example.clinicalconceptsapp;

import org.springframework.stereotype.Service;

@Service
public class UserService {
    public User getCurrentUser() {
        // Mocked current user
        User user = new User();
        user.setUsername("regularUser");
        user.setIsAdmin(false);  // Set to true if user is admin

        // Example admin user (uncomment to simulate an admin)
        // user.setUsername("adminUser");
        // user.setIsAdmin(true);

        return user;
    }
}

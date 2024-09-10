package com.example.clinicalconceptsapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Replace * with the actual frontend URL for production
public class ClinicalConceptController {

    @Autowired
    private ClinicalConceptService service;

    // Fetch all clinical concepts
    @GetMapping("/concepts")
    public List<ClinicalConcept> getAllConcepts() {
        return service.getAllConcepts();
    }

    // Load hardcoded clinical data
    @GetMapping("/loadHardcodedData")
    public String loadHardcodedData() {
        service.loadHardcodedData();
        return "Hardcoded data loaded successfully!";
    }

    // Load clinical data from CSV file
    @GetMapping("/loadCsvData")
    public String loadCsvData() {
        service.loadCsvData();
        return "CSV data loaded successfully!";
    }
}

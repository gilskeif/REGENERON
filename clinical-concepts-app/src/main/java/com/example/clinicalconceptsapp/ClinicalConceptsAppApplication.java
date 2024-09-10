package com.example.clinicalconceptsapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ClinicalConceptsAppApplication implements CommandLineRunner {

    @Autowired
    private ClinicalConceptService service;

    public static void main(String[] args) {
        SpringApplication.run(ClinicalConceptsAppApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        // Load hardcoded data
        service.loadHardcodedData();

        // The CsvLoader component should handle CSV data loading
        System.out.println("Application started and data loaded.");
    }
}

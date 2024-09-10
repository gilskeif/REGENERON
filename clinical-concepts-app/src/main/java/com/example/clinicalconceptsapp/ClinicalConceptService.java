package com.example.clinicalconceptsapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class ClinicalConceptService {

    @Autowired
    private ClinicalConceptRepository repository;

    @Autowired
    private CsvLoader csvLoader;

    public List<ClinicalConcept> getAllConcepts() {
        return repository.findAll();
    }

    public Optional<ClinicalConcept> getConceptById(String id) {
        return repository.findById(id);
    }

    public ClinicalConcept addOrUpdateConcept(ClinicalConcept concept) {
        return repository.save(concept);
    }

    // Load hardcoded data
    public void loadHardcodedData() {
        ClinicalConcept concept1 = new ClinicalConcept(
                "C001",
                "Hypertension",
                "A condition in which the force of the blood against the artery walls is too high.",
                Arrays.asList("P001", "P002"),
                Arrays.asList("C002", "C003"),
                "High Blood Pressure"
        );
        repository.save(concept1);

        ClinicalConcept concept2 = new ClinicalConcept(
                "C002",
                "Diabetes Mellitus",
                "A disease that occurs when your blood glucose, also called blood sugar, is too high.",
                Arrays.asList("P003"),
                Arrays.asList("C004", "C005"),
                "Diabetes"
        );
        repository.save(concept2);

        ClinicalConcept concept3 = new ClinicalConcept(
                "C003",
                "Asthma",
                "A condition in which your airways narrow and swell and may produce extra mucus.",
                Arrays.asList("P004"),
                Arrays.asList("C006"),
                "Bronchial Asthma"
        );
        repository.save(concept3);

        ClinicalConcept concept4 = new ClinicalConcept(
                "C004",
                "Chronic Kidney Disease",
                "A condition characterized by a gradual loss of kidney function over time.",
                Arrays.asList("P002"),
                Arrays.asList("C005", "C006"),
                "CKD"
        );
        repository.save(concept4);

        ClinicalConcept concept5 = new ClinicalConcept(
                "C005",
                "Alzheimer's Disease",
                "A progressive disease that destroys memory and other important mental functions.",
                Arrays.asList("P005"),
                Arrays.asList(),
                "Alzheimer's"
        );
        repository.save(concept5);

        ClinicalConcept concept6 = new ClinicalConcept(
                "C006",
                "Parkinson's Disease",
                "A disorder of the central nervous system that affects movement, often including tremors.",
                Arrays.asList("P006"),
                Arrays.asList(),
                "Parkinson's"
        );
        repository.save(concept6);

        ClinicalConcept concept7 = new ClinicalConcept(
                "C007",
                "Coronary Artery Disease",
                "A disease caused by the buildup of plaque resulting in the arteries to become hardened and narrowed.",
                Arrays.asList("P001"),
                Arrays.asList("C008"),
                "CAD"
        );
        repository.save(concept7);

        ClinicalConcept concept8 = new ClinicalConcept(
                "C008",
                "Stroke",
                "Occurs when the blood supply to part of your brain is reduced, preventing brain tissue from getting oxygen.",
                Arrays.asList("P003"),
                Arrays.asList(),
                "Cerebrovascular Accident"
        );
        repository.save(concept8);

        ClinicalConcept concept9 = new ClinicalConcept(
                "C009",
                "Chronic Obstructive Pulmonary Disease",
                "A group of lung diseases that block airflow and make it difficult to breathe.",
                Arrays.asList("P004"),
                Arrays.asList("C010"),
                "COPD"
        );
        repository.save(concept9);

        ClinicalConcept concept10 = new ClinicalConcept(
                "C010",
                "Lung Cancer",
                "A type of cancer that begins in the lungs.",
                Arrays.asList("P007"),
                Arrays.asList(),
                "Pulmonary Carcinoma"
        );
        repository.save(concept10);
    }

    // Load data from CSV
    public void loadCsvData() {
        try {
            List<ClinicalConcept> concepts = csvLoader.loadCsvData();
            concepts.forEach(this::addOrUpdateConcept);  // Save each concept to the repository
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void deleteConcept(String id) {
        repository.deleteById(id);
    }
}
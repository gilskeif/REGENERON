package com.example.clinicalconceptsapp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClinicalConceptRepository extends JpaRepository<ClinicalConcept, String> {
    // Additional query methods can be added here
}

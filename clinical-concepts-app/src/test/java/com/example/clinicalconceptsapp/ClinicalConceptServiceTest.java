package com.example.clinicalconceptsapp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class ClinicalConceptServiceTest {

	@Autowired
	private ClinicalConceptService service;

	@Test
	public void testAddConcept() {
		ClinicalConcept concept = new ClinicalConcept();
		concept.setConceptId("6");
		concept.setDisplayName("Test Concept");
		concept.setDescription("A test description");

		ClinicalConcept saved = service.addOrUpdateConcept(concept);

		assertThat(saved.getConceptId()).isEqualTo("6");
	}
}

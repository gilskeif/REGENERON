package com.example.clinicalconceptsapp;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class CsvLoader {

    public List<ClinicalConcept> loadCsvData() throws Exception {
        List<ClinicalConcept> concepts = new ArrayList<>();

        BufferedReader reader = new BufferedReader(
                new InputStreamReader(new ClassPathResource("data.csv").getInputStream(), StandardCharsets.UTF_8)
        );

        // Skip the first line (header) and process the remaining lines
        reader.lines().skip(1).forEach(line -> {
            String[] columns = line.split(",");

            ClinicalConcept concept = new ClinicalConcept();
            concept.setConceptId(columns[0]);
            concept.setDisplayName(columns[1]);
            concept.setDescription(columns[2]);

            // Convert parentIds and childIds from comma-separated string to List<String>
            List<String> parentIds = Arrays.asList(columns[3].split(";"));
            List<String> childIds = Arrays.asList(columns[4].split(";"));

            concept.setParentIds(parentIds);
            concept.setChildIds(childIds);
            concept.setAlternateNames(columns[5]);

            concepts.add(concept);
        });

        System.out.println("CSV data loaded successfully!");
        return concepts;
    }
}

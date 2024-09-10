package com.example.clinicalconceptsapp;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.List;

@Entity
public class ClinicalConcept {

	@Id
	private String conceptId;
	private String displayName;
	private String description;

	@ElementCollection
	private List<String> parentIds;

	@ElementCollection
	private List<String> childIds;

	private String alternateNames;

	// Constructor with parameters
	public ClinicalConcept(String conceptId, String displayName, String description,
						   List<String> parentIds, List<String> childIds, String alternateNames) {
		this.conceptId = conceptId;
		this.displayName = displayName;
		this.description = description;
		this.parentIds = parentIds;
		this.childIds = childIds;
		this.alternateNames = alternateNames;
	}

	// Default constructor
	public ClinicalConcept() {}

	// Getters and Setters
	public String getConceptId() { return conceptId; }
	public void setConceptId(String conceptId) { this.conceptId = conceptId; }

	public String getDisplayName() { return displayName; }
	public void setDisplayName(String displayName) { this.displayName = displayName; }

	public String getDescription() { return description; }
	public void setDescription(String description) { this.description = description; }

	public List<String> getParentIds() { return parentIds; }
	public void setParentIds(List<String> parentIds) { this.parentIds = parentIds; }

	public List<String> getChildIds() { return childIds; }
	public void setChildIds(List<String> childIds) { this.childIds = childIds; }

	public String getAlternateNames() { return alternateNames; }
	public void setAlternateNames(String alternateNames) { this.alternateNames = alternateNames; }
}

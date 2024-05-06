package com.property.estate.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.property.estate.model.Property;

@Repository
public interface PropertyRepo extends JpaRepository<Property, Integer>{
	
	@Query("SELECT DISTINCT p.propertyType FROM Property p")
	List<String> findDistinctPropertyTypes();



	


}

package com.property.estate.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.property.estate.model.Role;

public interface RoleRepo extends JpaRepository<Role, Long>{
	
	Optional<Role> findByName(String role);


    boolean existsByName(String role);
	

}

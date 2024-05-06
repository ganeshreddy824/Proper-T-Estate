package com.property.estate.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.property.estate.model.User;

public interface UserRepo extends JpaRepository<User, Long> {
	
	boolean existsByEmail(String email);

    void deleteByEmail(String email);

   Optional<User> findByEmail(String email);

}

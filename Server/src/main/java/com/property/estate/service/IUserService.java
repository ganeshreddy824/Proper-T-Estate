package com.property.estate.service;

import java.util.List;
import java.util.Optional;

import com.property.estate.controller.RegistrationRequest;
import com.property.estate.model.User;

public interface IUserService {
	
	//User registerUser(RegistrationRequest request);
	User registerUser(User user);
//	String registerUser(User user);
	
    List<User> getUsers();
    void deleteUser(String email);
    User getUser(String email);
    void saveUserVerificationToken(User theUser, String verificationToken);
	Optional<User> findByEmail(String email);
	String validateToken(String token);

}

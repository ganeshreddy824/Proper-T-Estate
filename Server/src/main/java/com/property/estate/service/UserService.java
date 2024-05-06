package com.property.estate.service;

import java.util.Calendar;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.property.estate.exception.UserAlreadyExistsException;
import com.property.estate.model.Role;
import com.property.estate.model.User;
import com.property.estate.registration.token.VerificationToken;
import com.property.estate.registration.token.VerificationTokenRepository;
import com.property.estate.repo.RoleRepo;
import com.property.estate.repo.UserRepo;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{
	private final UserRepo userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepo roleRepository;
    private final VerificationTokenRepository tokenRepository;
    
    @Override
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())){
        	System.out.print("User alredy Existed");
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
            
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(user.getPassword());
        Role userRole = roleRepository.findByName("ROLE_USER").get();
        user.setRoles(Collections.singletonList(userRole));
        return userRepository.save(user);
    }
    
    
//    @Override
//    public String registerUser(User user) {
//        if (userRepository.existsByEmail(user.getEmail())){
//           return "Already User Existed";
//        }
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        System.out.println(user.getPassword());
//        Role userRole = roleRepository.findByName("ROLE_USER").get();
//        user.setRoles(Collections.singletonList(userRole));
//         userRepository.save(user);
//         return "Register successful";
//    }
    
    

//    @Override
//	public User registerUser(RegistrationRequest request) {
//		// TODO Auto-generated method stub
//		Optional<User> user=this.findByEmail(request.email());
//		if(user.isPresent()) {
//			throw new UserAlreadyExistsException(
//					"User with email "+request.email() +" already exists");
//		}
//		var newUser =new User();
//		newUser.setFirstName(request.firstName());
//		newUser.setLastName(request.lastName());
//		newUser.setEmail(request.email());
//		newUser.setPassword(passwordEncoder.encode(request.password()));
//		
//		
//		return userRepository.save(newUser);
//	}

	@Override
	public Optional<User> findByEmail(String email){
	//public User findByEmail(String email) {
		// TODO Auto-generated method stub
		return userRepository.findByEmail(email);
	}

	

	@Override
	public List<User> getUsers() {
		return userRepository.findAll();
	}
	
	@Transactional
	@Override
	public void deleteUser(String email) {
		 User theUser = getUser(email);
	        if (theUser != null){
	            userRepository.deleteByEmail(email);
	        }
		
	}

	@Override
	public User getUser(String email) {
		return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
	
	@Override
	public void saveUserVerificationToken(User theUser, String token) {
		// TODO Auto-generated method stub
		var verifiactionToken=new VerificationToken(token, theUser);
		tokenRepository.save(verifiactionToken);
		
	}

	@Override
	public String validateToken(String theToken) {
		// TODO Auto-generated method stub
		VerificationToken token=tokenRepository.findByToken(theToken);
		if(token == null){
            return "Invalid verification token";
        }
        User user = token.getUser();
        Calendar calendar = Calendar.getInstance();
        if ((token.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0){
            tokenRepository.delete(token);
            return "Token already expired";
        }
        user.setEnabled(true);
        userRepository.save(user);
        return "valid";
	}

	}


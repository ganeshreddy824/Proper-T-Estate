package com.property.estate.controller;

import java.util.List;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.property.estate.events.RegistrationCompleteEvent;
import com.property.estate.model.User;
import com.property.estate.registration.token.VerificationToken;
import com.property.estate.registration.token.VerificationTokenRepository;
import com.property.estate.request.LoginRequest;
import com.property.estate.response.JwtResponse;
import com.property.estate.security.jwt.JwtUtils;
import com.property.estate.security.user.PropertyUserDetails;
import com.property.estate.service.IUserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
	private final IUserService userService;
	private final AuthenticationManager authenticationManager;
	private final JwtUtils jwtUtils;
	private final ApplicationEventPublisher publisher;
	private final VerificationTokenRepository tokenRepository;
	
//		@PostMapping("/register")
//		public String registerUser(@RequestBody RegistrationRequest registrationRequest, HttpServletRequest request) {
//			User user=userService.registerUser(registrationRequest);
//			// publish registration event
//			publisher.publishEvent(new RegistrationCompleteEvent(user, applicationUrl(request)));
//			return "Success!!  Please, check your email for to complete your registration";
//		}
	
		
	
//		@PostMapping("/register-user")
//	    public ResponseEntity<?> registerUser(@RequestBody User user){
//	        try{
//	            userService.registerUser(user);
//	            return ResponseEntity.ok("Registration successful!");
//	
//	        }catch (UserAlreadyExistsException e){
//	            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
//	        }
//	    }
		
		@PostMapping("/register-user")
	    public String registerUser(@RequestBody User user, HttpServletRequest request){
			User userId=userService.registerUser(user);
			publisher.publishEvent(new RegistrationCompleteEvent(userId, applicationUrl(request)));
			return "Success!!  Please, check your email for to complete your registration";
	    }
	
	
		@GetMapping("/verifyEmail")
	    public String verifyEmail(@RequestParam("token") String token){
	        VerificationToken theToken = tokenRepository.findByToken(token);
	        if (theToken.getUser().isEnabled()){
	            return "This account has already been verified, please, login.";
	        }
	        String verificationResult = userService.validateToken(token);
	        if (verificationResult.equalsIgnoreCase("valid")){
	            return "Email verified successfully. Now you can login to your account";
	        }
	        return "Invalid verification token";
	    }

		@PostMapping("/login")
		public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest request){
			Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String jwt = jwtUtils.generateJwtTokenForUser(authentication);
			PropertyUserDetails userDetails = (PropertyUserDetails) authentication.getPrincipal();
			List<String> roles = userDetails.getAuthorities()
					.stream()
					.map(GrantedAuthority :: getAuthority).toList();
			return ResponseEntity.ok(new JwtResponse(
					userDetails.getId(),
					userDetails.getEmail(),				
					jwt,
					roles));
		}
	
		private String applicationUrl(HttpServletRequest request) {
			return "http://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath();
		}
}

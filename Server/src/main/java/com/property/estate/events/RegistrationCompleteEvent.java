package com.property.estate.events;

import org.springframework.context.ApplicationEvent;

import com.property.estate.model.User;

public class RegistrationCompleteEvent extends ApplicationEvent {
	
	
	
	public RegistrationCompleteEvent(User user, String applicationUrl) {
		super(user);
		this.user = user;
		this.applicationUrl = applicationUrl;
	}
	private User user;
	private String applicationUrl;
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getApplicationUrl() {
		return applicationUrl;
	}
	public void setApplicationUrl(String applicationUrl) {
		this.applicationUrl = applicationUrl;
	}
	
}

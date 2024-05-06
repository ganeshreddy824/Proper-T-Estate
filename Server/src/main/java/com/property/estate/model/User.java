package com.property.estate.model;


import java.util.Collection;
import java.util.HashSet;

import org.hibernate.annotations.NaturalId;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String firstName;
	private String lastName;
	
	@NaturalId(mutable = true)
	private String email;
	private String password;
	private boolean isEnabled = false;
	 @ManyToMany(fetch = FetchType.EAGER,
	            cascade = {CascadeType.PERSIST,
	                    CascadeType.MERGE, CascadeType.DETACH})
	    @JoinTable(name = "user_roles",
	            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
	    inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
	    private Collection<Role> roles = new HashSet<>();
	
	

}

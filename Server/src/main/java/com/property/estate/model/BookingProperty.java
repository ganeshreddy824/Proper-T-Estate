package com.property.estate.model;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingProperty {
	
	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long bookingId;
	
	private LocalDate visitDate;
	private String guestName;
	private String guestEmail;
	private String bookingConformationCode;
	
	@ManyToOne(fetch = FetchType.LAZY)
	
	@JoinColumn(name="property_id")
	private Property property;
	
	

}

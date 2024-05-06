package com.property.estate.response;

import java.math.BigDecimal;

import java.util.List;

import org.apache.tomcat.util.codec.binary.Base64;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PropertyResponse {

	private int id;
	private String name;
	private String area;
	private String facing;
	private String address;
	private String dealer_name;
	private String measurements;
	private boolean isBooked;
	private String propertyType;
	private BigDecimal propertyPrice;
	
	private String image;
	private List<BookingResponse>bookings;
	
	
	
		

	public PropertyResponse(int id, String name, String area, String facing, String address, String dealer_name,
			String measurements, String propertyType, BigDecimal propertyPrice) {
		super();
		this.id = id;
		this.name = name;
		this.area = area;
		this.facing = facing;
		this.address = address;
		this.dealer_name = dealer_name;
		this.measurements = measurements;
		this.propertyType = propertyType;
		this.propertyPrice = propertyPrice;
	}

	public PropertyResponse(int id, String name, String area, String facing, String address, String dealer_name,			String measurements, boolean isBooked, String propertyType, BigDecimal propertyPrice,byte[] imageBytes,
			List<BookingResponse> bookings) {
		super();
		this.id = id;
		this.name = name;
		this.area = area;
		this.facing = facing;
		this.address = address;
		this.dealer_name = dealer_name;
		this.measurements = measurements;
		this.isBooked = isBooked;
		this.propertyType = propertyType;
		this.propertyPrice = propertyPrice;
		this.image = imageBytes !=null ? Base64.encodeBase64String(imageBytes) : null;;
		this.bookings = bookings;
	}
	
	
	





//	public PropertyResponse(int id, String name, String area, String facing, String address, String configuration,
//			String possession_in, String origin, String description, String dealer_name, String measurements,
//			String propertyType, BigDecimal propertyPrice) {
//		super();
//		this.id = id;
//		this.name = name;
//		this.area = area;
//		this.facing = facing;
//		this.address = address;
//		this.configuration = configuration;
//		this.possession_in = possession_in;
//		this.origin = origin;
//		this.description = description;
//		this.dealer_name = dealer_name;
//		this.measurements = measurements;
//		this.propertyType = propertyType;
//		this.propertyPrice = propertyPrice;
//	}





//public PropertyResponse(int id, String name, String area, String facing, String address, String configuration,
//		String possession_in, String origin, String description, String dealer_name, String measurements,
//		boolean isBooked, String propertyType, BigDecimal propertyPrice,byte[] imageBytes, List<BookingResponse> bookings) {
//	super();
//	this.id = id;
//	this.name = name;
//	this.area = area;
//	this.facing = facing;
//	this.address = address;
//	this.configuration = configuration;
//	this.possession_in = possession_in;
//	this.origin = origin;
//	this.description = description;
//	this.dealer_name = dealer_name;
//	this.measurements = measurements;
//	this.isBooked = isBooked;
//	this.propertyType = propertyType;
//	this.propertyPrice = propertyPrice;
//	this.image = imageBytes !=null ? Base64.encodeBase64String(imageBytes) : null;
//	this.bookings = bookings;
//}
	
}

package com.property.estate.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.property.estate.model.Property;

public interface PropertyInterface {
	
	
	public Property addNewProperty( MultipartFile image,String name, String area, String facing, String address, String dealer_name,
			String measurements, String propertyType, BigDecimal propertyPrice) throws IOException,SQLException;


	public List<String> getAllPropertyTypes();

	public List<Property> getAllProperties();

	public byte[] getPropertyImageByPropertyId(int propertyId) throws SQLException;

	public String deleteProperty(int propertyId);

	public Property getPropertyById(int propertyId);

	



	Property updateProperty(int propertyId, String name, String area, String facing, String address, String dealer_name,
			String measurements, byte[] imageBytes, String propertyType, BigDecimal propertyPrice);


	

}

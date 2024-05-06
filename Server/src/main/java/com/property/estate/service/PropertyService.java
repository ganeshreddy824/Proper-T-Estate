package com.property.estate.service;


import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.property.estate.exception.InternalServerException;
import com.property.estate.exception.ResourceNotFoundException;
import com.property.estate.model.Property;
import com.property.estate.repo.PropertyRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PropertyService implements PropertyInterface {
	
	@Autowired
	private final PropertyRepo repo;

	@Override
	public Property addNewProperty( MultipartFile image,String name, String area, String facing, String address, String dealer_name,
			String measurements, String propertyType, BigDecimal propertyPrice) throws IOException,SQLException {
		// TODO Auto-generated method stub
		Property property=new Property();
		property.setName(name);
		
		property.setArea(area);
		property.setFacing(facing);
		property.setAddress(address);
		property.setDealer_name(dealer_name);
		property.setMeasurements(measurements);
		property.setPropertyType(propertyType);
		property.setPropertyPrice(propertyPrice);
		if(!image.isEmpty()) {
			byte[] imageBytes=image.getBytes();
			Blob imageBlob=new SerialBlob(imageBytes);
			property.setImage(imageBlob);
			
		}
		return repo.save(property);
	}

	@Override
	public List<String> getAllPropertyTypes() {
		// TODO Auto-generated method stub
		return repo.findDistinctPropertyTypes();
	}

	@Override
	public List<Property> getAllProperties() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}
	
	@Override
	public byte[] getPropertyImageByPropertyId(int propertyId) throws SQLException {
	    if (propertyId <= 0) {
	        throw new IllegalArgumentException("Invalid property ID: " + propertyId);
	    }

	    Optional<Property> theProperty = repo.findById(propertyId);
	    if (theProperty.isEmpty()) {
	        throw new ResourceNotFoundException("Property not found for ID: " + propertyId);
	    }

	    Blob imageBlob = theProperty.get().getImage();
	    if (imageBlob != null) {
	        try {
	            return imageBlob.getBytes(1, (int) imageBlob.length());
	        } catch (SQLException e) {
	            throw new InternalServerException("Error retrieving property image");
	        }
	    }
	    return null;
	}

//	@Override
//	public byte[] getPropertyImageByPropertyId(int propertyId) throws SQLException {
//		// TODO Auto-generated method stub
//		Optional<Property> theProperty = repo.findById(propertyId);
//		if(theProperty.isEmpty()) {
//			throw new ResourceNotFoundException("Sorry, Property not found!");
//		}
//		Blob imageBlob=theProperty.get().getImage();
//		if(imageBlob != null) {
//			return imageBlob.getBytes(1, (int)imageBlob.length());	
//			}
//		return null;
//	}
	

	@Override
	public String deleteProperty(int propertyId) {
		// TODO Auto-generated method stub
		Optional<Property> theRoom = repo.findById(propertyId);
        if(theRoom.isPresent()){
            repo.deleteById(propertyId);
            return ("deleted Successfully");
        }else {
        	return ("Property with ID " + propertyId + " not found for deletion.");
        }
		
	}
	
	

	@Override
	public Property getPropertyById(int propertyId) {
		// TODO Auto-generated method stub
		return (repo.findById(propertyId).get());
	}
	
	


	@Override
	public Property updateProperty(int propertyId, String name, String area, String facing, String address,
			String dealer_name, String measurements, byte[] imageBytes, String propertyType, BigDecimal propertyPrice) {
		// TODO Auto-generated method stub
		Property prop = repo.findById(propertyId).orElseThrow(() -> new ResourceNotFoundException("Property not Found"));
        if (name != null) {
        	prop.setName(name);
        }
        if (area != null) {
        	prop.setArea(area);
        }
        if (facing != null) {
        	prop.setFacing(facing);
        }
        if (address != null) {
        	prop.setAddress(address);
        }
        if (dealer_name != null) {
        	prop.setDealer_name(dealer_name);
        }
        if (measurements != null) {
        	prop.setMeasurements(measurements);
        }
        if (propertyType != null) {
        	prop.setPropertyType(propertyType);
        }
        if (propertyPrice != null) {
        	prop.setPropertyPrice(propertyPrice);
        }
        if (imageBytes != null && imageBytes.length > 0) {
            try {
            	prop.setImage(new SerialBlob(imageBytes));
            } catch (SQLException ex) {
                throw new InternalServerException("Fail updating Property");
            }
        }
       return repo.save(prop);
	}
}
//		
//	}

//	@Override
//	public Property addNewProperty(MultipartFile image, String name, String area, String facing, String address,
//			String dealer_name, String measurements, String configuration, String possession_in, String origin,
//			String description, String propertyType, BigDecimal propertyPrice) throws IOException, SQLException {
//		
//		Property property=new Property();
//		property.setName(name);
//		property.setArea(area);
//		property.setFacing(facing);
//		property.setAddress(address);
//		property.setDealer_name(dealer_name);
//		property.setMeasurements(measurements);
//		property.setConfiguration(configuration);
//		property.setPossession_in(possession_in);
//		property.setOrigin(origin);
//		property.getDescription();
//		property.setPropertyType(propertyType);
//		property.setPropertyPrice(propertyPrice);
//		if(!image.isEmpty()) {
//			byte[] imageBytes=image.getBytes();
//			Blob imageBlob=new SerialBlob(imageBytes);
//			property.setImage(imageBlob);
//			
//		}
//		return repo.save(property);
//	}

//	@Override
//	public Property updateProperty(int propertyId, String name, String area, String facing, String address,
//			String dealer_name, String measurements, String configuration, String possession_in, String origin,
//			String description, byte[] imageBytes, String propertyType, BigDecimal propertyPrice) {
//			
//		Property prop = repo.findById(propertyId).orElseThrow(() -> new ResourceNotFoundException("Property not Found"));
//        if (name != null) {
//        	prop.setName(name);
//        }
//        if (area != null) {
//        	prop.setArea(area);
//        }
//        if (facing != null) {
//        	prop.setFacing(facing);
//        }
//        if (address != null) {
//        	prop.setAddress(address);
//        }
//        if (dealer_name != null) {
//        	prop.setDealer_name(dealer_name);
//        }
//        if (measurements != null) {
//        	prop.setMeasurements(measurements);
//        }
//        if (configuration != null) {
//        	prop.setConfiguration(configuration);
//        }
//        if (possession_in != null) {
//        	prop.setPossession_in(possession_in);
//        }
//        if (origin != null) {
//        	prop.setOrigin(origin);
//        }
//        if (description != null) {
//        	prop.setDescription(description);
//        }
//        if (propertyType != null) {
//        	prop.setPropertyType(propertyType);
//        }
//        if (propertyPrice != null) {
//        	prop.setPropertyPrice(propertyPrice);
//        }
//        if (imageBytes != null && imageBytes.length > 0) {
//            try {
//            	prop.setImage(new SerialBlob(imageBytes));
//            } catch (SQLException ex) {
//                throw new InternalServerException("Fail updating Property");
//            }
//        }
//       return repo.save(prop);
//	}




//	@Override
//	public Property addNewProperty(MultipartFile image, String name, String area, String facing, String address,
//			String dealer_name, String measurements, String propertyType, String possession_in, String origin,
//			String description, String propertyType2, BigDecimal propertyPrice) throws IOException, SQLException {
//		Property property=new Property();
//		property.setName(name);
//		
//		property.setArea(area);
//		property.setFacing(facing);
//		property.setAddress(address);
//		property.setDealer_name(dealer_name);
//		property.setMeasurements(measurements);
//		property.setPropertyType(propertyType);
//		property.setPropertyPrice(propertyPrice);
//		if(!image.isEmpty()) {
//			byte[] imageBytes=image.getBytes();
//			Blob imageBlob=new SerialBlob(imageBytes);
//			property.setImage(imageBlob);
//			
//		}
//		return repo.save(property);
//	}
//}

//@Override
//public Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, byte[] photoBytes) {
//	Room room = roomRepository.findById(roomId).orElseThrow(()-> new ResourceNotFoundException("Room not found"));
//	if(roomType != null) {
//		room.setRoomType(roomType);
//	}
//	if(roomPrice!= null) {
//		room.setRoomPrice(roomPrice);
//	}
//	if(photoBytes!=null && photoBytes.length>0) {
//		try {
//			room.setPhoto(new SerialBlob(photoBytes));
//		} catch (SQLException ex) {
//			throw new InternalServerException("Error updating room");
//		}
//	}
//	return roomRepository.save(room);
//}

	



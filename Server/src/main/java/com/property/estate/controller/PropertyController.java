package com.property.estate.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.sql.rowset.serial.SerialBlob;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.property.estate.exception.ImageRetrievalException;
import com.property.estate.model.BookingProperty;
import com.property.estate.model.Property;
import com.property.estate.response.BookingResponse;
import com.property.estate.response.PropertyResponse;
import com.property.estate.service.BookingService;
import com.property.estate.service.PropertyInterface;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Properties")
public class PropertyController {
	
		private final PropertyInterface propertyServiceInterface;
		private final BookingService bookingService;
	
		@PostMapping("/addProperty")
		@PreAuthorize("hasRole('ROLE_ADMIN')")
		public ResponseEntity<PropertyResponse>  addNewProperty(
						@RequestParam("image") MultipartFile image,
				        @RequestParam("name") String name,
				        @RequestParam("area") String area,
				        @RequestParam("facing") String facing,
						@RequestParam("address") String address,
						@RequestParam("dealer_name") String dealer_name,
						@RequestParam("measurements") String measurements,
						
						@RequestParam("propertyType") String propertyType,
						@RequestParam("propertyPrice") BigDecimal propertyPrice) throws IOException, SQLException{
						Property savedProperty=propertyServiceInterface.addNewProperty(image, name, area, facing, address, dealer_name, measurements, propertyType, propertyPrice);
						PropertyResponse response =new PropertyResponse(savedProperty.getId(),
																		savedProperty.getName(),
																		savedProperty.getArea(),
																		savedProperty.getFacing(),
																		savedProperty.getAddress(),
																		savedProperty.getDealer_name(),
																		savedProperty.getMeasurements(),
																		savedProperty.getPropertyType(),
																		savedProperty.getPropertyPrice());
						return ResponseEntity.ok(response);
						           
			
			}
	
			@GetMapping("/propertyTypes")
			public List<String> getPropertyTypes(){
				return propertyServiceInterface.getAllPropertyTypes();
			}
		
			@GetMapping("/all-properties")
			public ResponseEntity<List<PropertyResponse>> getAllProperties() throws SQLException{
				List<Property> properties=propertyServiceInterface.getAllProperties();
				List<PropertyResponse> propertyResponses=new ArrayList<>();
				for(Property property : properties) {
					byte[] imageBytes=propertyServiceInterface.getPropertyImageByPropertyId(property.getId());
					if(imageBytes != null && imageBytes.length > 0) {
						String base64Image=Base64.encodeBase64String(imageBytes);
						PropertyResponse propertyResponse=getPropertyResponse(property);
						propertyResponse.setImage(base64Image);
						propertyResponses.add(propertyResponse);
					}
				}
				return ResponseEntity.ok(propertyResponses);
				
			}
		
			private PropertyResponse getPropertyResponse(Property property) {
				List<BookingProperty> bookings=getAllBookingsByPropertyId(property.getId());
				List<BookingResponse> bookingInfo;
				if (bookings != null) {
			        bookingInfo = bookings.stream()
			                .map(booking -> new BookingResponse(booking.getBookingId(), booking.getVisitDate(), booking.getBookingConformationCode()))
			                .toList();
			    } else {
			        bookingInfo = Collections.emptyList(); // Handle empty bookings case
			    }
				byte[] imageBytes=null;
				Blob imageBlob=property.getImage();
				if(imageBlob != null) {
					try {
						imageBytes= imageBlob.getBytes(1, (int) imageBlob.length());
					}catch(SQLException e) {
						throw new ImageRetrievalException("Error retrieving photo");
					}
				}
				return new PropertyResponse(property.getId(),
											property.getName(),
											property.getArea(),
											property.getFacing(),
											property.getAddress(),
											property.getDealer_name(),
											property.getMeasurements(),
											property.isBooked(),
											property.getPropertyType(),
											property.getPropertyPrice(),
											imageBytes,
											bookingInfo);
				
				
			}
			
			
			@PutMapping("/update/{propertyId}")
			@PreAuthorize("hasRole('ROLE_ADMIN')")
		    public ResponseEntity<PropertyResponse> updateProperty(@PathVariable int propertyId,
		    		@RequestParam(required = false) String name,
			        @RequestParam(required = false) String area,
			        @RequestParam(required = false) String facing,
					@RequestParam(required = false) String address,
					@RequestParam(required = false) String dealer_name,
					@RequestParam(required = false) String measurements,
					@RequestParam(required = false) MultipartFile image,
					@RequestParam(required = false) String propertyType,
					@RequestParam(required = false) BigDecimal propertyPrice) throws IOException, SQLException {
		        byte[] imageBytes = image != null && !image.isEmpty() ?
		                image.getBytes() : propertyServiceInterface.getPropertyImageByPropertyId(propertyId);
		        Blob imageBlob = imageBytes != null && imageBytes.length >0 ? new SerialBlob(imageBytes): null;
		        Property theProperty = propertyServiceInterface.updateProperty(propertyId, name, area, facing, address, dealer_name, measurements, imageBytes, propertyType, propertyPrice);
		        theProperty.setImage(imageBlob);
		        PropertyResponse propertyResponse = getPropertyResponse(theProperty);
		        return ResponseEntity.ok(propertyResponse);
		    }
			
			
		
		 	@DeleteMapping("/delete/property/{propertyId}")
		 	@PreAuthorize("hasRole('ROLE_ADMIN')")
		    public ResponseEntity<Void> deleteProperty(@PathVariable int propertyId){
		 		 propertyServiceInterface.deleteProperty(propertyId);
		 		 return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		         
		    }
//		 	 @GetMapping("/property/{propertyId}")
//		     public ResponseEntity<List<PropertyResponse>> getPropertyById(@PathVariable int propertyId) {
//		         Optional<Property> properties = propertyServiceInterface.getPropertyById(propertyId);
//		         
//		         if (properties.isEmpty()) {
//		             throw new ResourceNotFoundException("Properties not found for ID: " + propertyId);
//		         }
//
//		         List<PropertyResponse> propertyResponses = properties.stream()
//		             .map(this::getPropertyResponse)
//		             .collect(Collectors.toList());
//
//		         return ResponseEntity.ok(propertyResponses);
//		     }
		 	
//		 	 @GetMapping("/property/{propertyId}")
//		     public ResponseEntity<Optional<PropertyResponse>> getPropertyById(@PathVariable int propertyId){
//		 		 Optional<Property> theProperty= propertyServiceInterface.getPropertyById(propertyId);
//		 		 System.out.println(theProperty);
//		 		 return theProperty.map(property -> {
//				 		 PropertyResponse propertyResponse = getPropertyResponse(property);
//				         return  ResponseEntity.ok(Optional.of(propertyResponse));
//		         
//		 		 	}).orElseThrow(() -> new ResourceNotFoundException("Property not found"));
//		 	 }
//		 	
		 	
//		 		 @GetMapping("/room/{roomId}")
//		 	    public ResponseEntity<Optional<RoomResponse>> getRoomById(@PathVariable Long roomId){
//		 	        Optional<Room> theRoom = roomService.getRoomById(roomId);
//		 	        return theRoom.map(room -> {
//		 	            RoomResponse roomResponse = getRoomResponse(room);
//		 	            return  ResponseEntity.ok(Optional.of(roomResponse));
//		 	        }).orElseThrow(() -> new ResourceNotFoundException("Room not found"));
//		 	    }
		 	
		 
//		 	
		 	 @GetMapping("/property/{propertyId}")
		     public Property getPropertyById(@PathVariable int propertyId){
		 		 System.out.println(propertyServiceInterface.getPropertyById(propertyId));
		         return propertyServiceInterface.getPropertyById(propertyId);
		         
		     }
		 	 
//		 	 Optional<Room> theRoom = roomService.getRoomById(roomId);
//		        return theRoom.map(room -> {
//		            RoomResponse roomResponse = getRoomResponse(room);
//		            return  ResponseEntity.ok(Optional.of(roomResponse));
//		        }).orElseThrow(() -> new ResourceNotFoundException("Room not found"));
		 	 
		 	
		 	 
		 	 
			private List<BookingProperty> getAllBookingsByPropertyId(int propertyId) {
				// TODO Auto-generated method stub
				return bookingService.getAllBookingsByPropertyId(propertyId);
			}
	
	
	

}

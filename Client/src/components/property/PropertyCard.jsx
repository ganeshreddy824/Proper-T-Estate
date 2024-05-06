import React, { useContext } from "react"
import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const PropertyCard = ({property}) => {
  return (
    <Col key={property.id} className="mb-4" xs={12}  >
        <Card className=" shadow " style={{ marginLeft:'30%', width:'950px', height:'250px', borderColor:'black', borderWidth:'1px', borderRadius:'20px'  }}>
            <Card.Body className={"d-flex gap-2 align-items-center"}>
                <div className={"flex  mb-3 mb-md-0 "}>
                    <Link to={`/view-property/${property.id}`}>
                        <Card.Img
                            variant="top"
                            src={`data:image/png;base64, ${property.image}`}
                            className=" shadow "
                            alt="Property Photo"
                            style={{ width: "90%",  height: "220px" }}
                        />
                    </Link>
                </div>
                <div className=" d-flex  gap-2 " >
                    <div style={{marginLeft:'-3%'}}>
                        <h3 className={"property-color"}>{property.name}</h3>
                        <h5 style={{ fontSize:'17px', fontWeight:'lighter' }}>{property.propertyType} in {property.area}</h5>
                        <div className=" d-flex flex-row gap-5 " >
                            <h4 >{property.propertyPrice}</h4>
                            <h5 >{property.measurements}</h5>
                        </div>
                        <Card.Title className={"property-price"}>{property.area}   </Card.Title>
                        
                        
                        <Card.Title className={"property-price"}>{property.facing}</Card.Title>
                        <Card.Title className={"property-price"}>{property.address}</Card.Title>
                        <Card.Title className={"property-price"}>{property.dealer_name}</Card.Title>
                        
                        
                        
                    </div>
                    
                    <div className="flex-shrink-0 mt-5">
                        
                        <Link to={`/view-property/${property.id}`} className="btn  btn-sm  viewproperty-button ">
                            View Property
                        </Link>
                    </div>
                </div>
            </Card.Body>
        </Card>
    </Col>
  )
}

export default PropertyCard
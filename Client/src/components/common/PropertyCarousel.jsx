import React from 'react'
import { getAllProperties } from '../utils/ApiFunctions'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { Card, Carousel, Col, Container, Row } from "react-bootstrap"

const PropertyCarousel = () => {
    const [properties, setProperties] = useState([{ id: "",
                                                    image : "",
                                                    name : "",
                                                    area : "",
                                                    facing : "",
                                                    address : "",
                                                    dealer_name : "",
                                                    measurements : "",
                                                    propertyType : "",
                                                    propertyPrice : "",}])
	const [errorMessage, setErrorMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		getAllProperties()
			.then((data) => {
				setProperties(data)
				setIsLoading(false)
			})
			.catch((error) => {
				setErrorMessage(error.message)
				setIsLoading(false)
			})
	}, [])

	if (isLoading) {
		return <div className="mt-5">Loading Properties....</div>
	}
	if (errorMessage) {
		return <div className=" text-danger mb-5 mt-5">Error : {errorMessage}</div>
	}
  return (
    <section className=" mb-5 mt-5 shadow property-carouserl rounded-4 " id='service'  >

        <Container className='pt-3 ' >
            <Carousel indicators={false}  >
                {[...Array(Math.ceil(properties.length / 4))].map((_, index) => (
                    <Carousel.Item key={index} >
                        <Row >
                            {properties.slice(index *4, index * 4 + 4).map((property) => (
                                <Col key={property.id} className="mb-4" xs={12} md={6} lg={3}>
                                    <Card>
                                        <Link to={`/view-property/${property.id}`}>
                                            <Card.Img
                                                variant="top"
                                                src={`data:image/png;base64, ${property.image}`}
                                                alt="Property Photo"
                                                className="w-100"
                                                style={{ height: "200px" }}
                                            />
                                        </Link>
                                        <Card.Body>
                                        <Card.Title className={"property-color"}><span className='carousel-span' >Title :</span> {property.propertyType}</Card.Title>
                                        <Card.Title className={"property-price"}><span className='carousel-span'>Price :</span>{property.propertyPrice}</Card.Title>
                                        <Card.Title className={"property-price"}><span className='carousel-span'>Area :</span>{property.area}</Card.Title>
                                        <Card.Title className={"property-price"}><span className='carousel-span'>Facing :</span>{property.facing}</Card.Title>
                                        <Card.Title className={"property-price"}><span className='carousel-span'>Measurements :</span>{property.measurements}</Card.Title>
                                        <Card.Title className={"property-price"}><span className='carousel-span'>Address :</span>{property.address}</Card.Title>
                                        <Card.Title className={"property-price"}><span className='carousel-span' >Agent :</span>{property.dealer_name}</Card.Title>
                                        
                                            <div className="flex-shrink-0">
                                                <Link to={`/view-property/${property.id}`} className="btn btn-hotel btn-sm rounded-3 " >
                                                    view
                                                </Link>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    </section>
)
}

export default PropertyCarousel
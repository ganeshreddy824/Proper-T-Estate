import React from 'react'
import { getAllProperties } from '../utils/ApiFunctions'
import { Link } from "react-router-dom"
import { Card, Carousel, Col, Container, Row } from "react-bootstrap"
import { useState, useEffect } from 'react'

const AdCarousel = () => {
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
    <div>
        <section className=" shadow  ad-carousel  " >

            <Container className='pt-3  ' >
                <Carousel indicators={false}>
                    {[...Array(Math.ceil(properties.length / 4))].map((_, index) => (
                        <Carousel.Item key={index}>
                            <Row>
                                {properties.slice(index *4, index * 4 + 4).map((property) => (
                                    <Col key={property.id} className="mb-4  " xs={12} md={6} lg={3}>
                                        <Card className=' img-card shadow ' >
                                            <Link to={`/view-property/${property.id}`}>
                                                <Card.Img
                                                    variant="top"
                                                    src={`data:image/png;base64, ${property.image}`}
                                                    alt="Property Photo"
                                                    className="img w-100  "
                                                    
                                                    
                                                />
                                            </Link>
                                            
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
            
        </section>
        
    </div>
  )
}

export default AdCarousel
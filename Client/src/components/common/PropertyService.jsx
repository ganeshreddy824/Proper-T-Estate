import React from 'react'
import { Container, Row, Col, Card } from "react-bootstrap"
import Header from "./Header"
import {
	FaClock,
	FaCocktail,
	FaParking,
	FaSnowflake,
	FaTshirt,
	FaCamera,
	FaWifi,
    FaCar,
    FaAmbulance,
    FaShopify
} from "react-icons/fa"

const PropertyService = () => {
  return (
  <>
            <div className="mb-2">
                <Header title={"Our Services"} />

                <Row className="mt-4">
                    <h4 className="text-center">
                        Properties at <span className="hotel-color"> Property - </span>Estate
                        <span className="gap-2">
                            <FaClock className="ml-5" /> 24-Hour Front Desk
                        </span>
                    </h4>
                </Row>
                <hr />

                <Row xs={1} md={2} lg={3} className="g-4 mt-2">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaWifi /> High-Speed Internet and Connectivity
                                </Card.Title>
                                <Card.Text>Essential for modern businesses, reliable internet service is a crucial amenity.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                <FaCamera/> Security
                                </Card.Title>
                                <Card.Text>Gated communities, security patrols, and surveillance systems provide residents with peace of mind.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaCar /> Public Transportation
                                </Card.Title>
                                <Card.Text>Access to public transportation options such as bus stops or train stations.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaShopify /> Retail Space
                                </Card.Title>
                                <Card.Text>Shops, restaurants, and cafes within or adjacent to residential or commercial areas.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaParking /> Parking
                                </Card.Title>
                                <Card.Text>Sufficient parking space for employees, clients, and visitors..</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaAmbulance /> Hospital
                                </Card.Title>
                                <Card.Text>Hospital property estate amenities include medical facilities, advanced technology,and staff facilities.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            <hr />
    </>
)
}

export default PropertyService
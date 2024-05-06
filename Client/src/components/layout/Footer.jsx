import React from 'react'
import { Col, Container, Row } from "react-bootstrap"
import { Link } from 'react-router-dom'

const Footer = () => {

    let today = new Date()
  return (
    <footer className="bg-dark text-light py-3 footer mt-lg-5 pt-4 " style={{height:'200px'}} >
    <Container  >
        <Row>
            <Col  md={6} className="text-center pt-4" style={{marginLeft:'-1%'}} >
                <h4 className="mb-0"> PROPER-T-ESTATE</h4>
                <p className="mb-0"> &copy; {today.getFullYear()} Properties</p>
            </Col>
              <Col  md={1} className="text-start d-flex flex-column " style={{marginLeft:'5%'}}  >
                <h6>CONTENT</h6>
                <Link to='/home' >Home</Link>
                <Link to='/aboutus' >AboutUS</Link>
                <Link to='/service' >Service</Link>
                <Link to='/properties' >Browse Properties</Link>
                
                
              </Col>
              <Col  md={2} className="text-start "style={{marginLeft:'5%'}}  >
                  <h6 className="mb-0 fw-light">LEGAL</h6>
                  <p className="mb-0 fw-light"> Terms of use</p>
                  <p className="mb-0 fw-light"> Privacy Polic</p>
                  <p className="mb-0 fw-light"> Copyright Information</p>
              </Col>
              <Col  md={1} className="text-start ">
                  <h6 className="mb-0 fw-light">SUPPORT</h6>
                  <p className="mb-0 fw-light"> FAQ</p>
                  <p className="mb-0 fw-light"> Contact</p>
                
              </Col>
              
        </Row>
    </Container>
</footer>
  )
}

export default Footer

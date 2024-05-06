import React, { useContext, useRef } from "react"
import { getPropertyById } from "../utils/ApiFunctions"
import { Link, Navigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { TbSwimming } from "react-icons/tb";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { SlDirections } from "react-icons/sl";
import { MdOutlineMyLocation } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";


import { Card, Col } from "react-bootstrap"
import PropertyCarousel from "../common/PropertyCarousel"
import { BsJustify } from "react-icons/bs";
import Parallax from "../common/Parallax";
import { ModalCard } from "../utils/ApiFunctions";



const ViewProperty = () => {

    const [show, setShow] = useState(false);


    const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [propertyInfo, setPropertyInfo] = useState({
                                                    image : "",
                                                    name : "",
                                                    area : "",
                                                    facing : "",
                                                    address : "",
                                                    dealer_name : "",
                                                    measurements : "",
                                                    propertyType : "",
                                                    propertyPrice : "",
	})

	const { propertyId } = useParams()

	useEffect(() => {
		setTimeout(() => {
			getPropertyById(propertyId)
				.then((response) => {
					setPropertyInfo(response)
					setIsLoading(false)
				})
				.catch((error) => {
					setError(error)
					setIsLoading(false)
				})
		}, 1000)
	}, [propertyId])

    const agent = useRef();
    const handleagent=()=>{
        agent.current.scrollIntoView({ behavior: "smooth" })
    }

   
  return (

    <>
        <div>
            <div>
            {isLoading ? (
							<p>Loading Property information...</p>
						) : error ? (
							<p>{error}</p>
						) : (
                                <div>
                                    <div className=" d-flex flex-row gap-5 " > 
                                        <div className=" border border-dark border-1 view  "  >
                                            <img src={`data:image/png;base64, ${propertyInfo.image}`} alt="Property Photo"
                                                        style={{ width: "300px ",  height: "270px" }}
                                            />
                                            
                                        </div>
                                        <div >
                                            <div style={{ marginTop:'6%', marginLeft:'85%' }} >

                                                {/* <ModalCard
                                                    show={show}
                                                    onHide={() => setShow(false)}
                                                /> */}
                                                <button className="contact-button" onClick={handleagent}  >Agent</button>

                                            </div>
                                            <div className=" border border-dark border-1     " style={{ width:'700px', height:'250px', borderRadius:'20px', marginTop:'7.5%' }}  >
                                                <div  style={{marginLeft:'4%', marginTop:'2%' }}>
                                                        <h4 className={"property-color"}>{propertyInfo.name}</h4>
                                                        <h5 style={{ fontSize:'17px', fontWeight:'lighter' }}>{propertyInfo.propertyType} in  {propertyInfo.area}</h5>
                                                        
                                                            <div className=" d-flex flex-row gap-4 " >
                                                                <h4 ><MdOutlineCurrencyRupee style={{ width:'23px', height:'23px', marginTop:'-3px' }} />{propertyInfo.propertyPrice}</h4>
                                                                <TbRulerMeasure style={{ width:'20px', height:'20px', marginLeft:'1%', marginTop:'2px' }} />
                                                                <h5 style={{marginLeft:'-2%'}} > {propertyInfo.measurements}</h5>
                                                            </div>
                                                            <div className=" d-flex flex-row " >
                                                                <div>
                                                                    <Card.Title className={"property-price"}>{propertyInfo.area}   </Card.Title>
                                                                    <div className=" d-flex flex-row " >
                                                                        <SlDirections style={{width:'20px', height:'20px', marginTop:'3%' }} />
                                                                        <p>Facing</p>
                                                                        <Card.Title className={"property-price"} style={{ marginLeft:'20%', marginTop:'4px' }} >{propertyInfo.facing}</Card.Title>
                                                                    </div>
                                                                    <div className=" d-flex flex-row " >
                                                                        <MdOutlineMyLocation style={{width:'20px', height:'20px', marginTop:'-10%' }} />
                                                                        
                                                                        <h5 className="property-price" style={{marginTop:'-9%', marginLeft:'10%' }} >{propertyInfo.address}</h5>
                                                                    </div>
                                                                    <div className=" d-flex flex-row "  >
                                                                        <p>Dealer  </p>
                                                                        <Card.Title className={"property-price"} style={{ marginLeft:'20%', marginTop:'2px' }}  >{propertyInfo.dealer_name}</Card.Title>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <p style={{ marginLeft:'12%', marginTop:'-10%' }} >Beautiful {propertyInfo.propertyType} in {propertyInfo.area} Town, are now  available in {propertyInfo.name} {propertyInfo.propertyType} project. Apartments in this complex are 
                                                                    <br /> available in price range of Rs.{propertyInfo.propertyPrice}. {propertyInfo.name} projects  has 
                                                                    <br /> {propertyInfo.propertyType} in multiple configurations, in range of 3,630 sq.ft.. 
                                                                    <br /> {propertyInfo.propertyType} has Ready To Move in this project.
                                                                </p>

                                                        </div>    

                                                        
                                                    
                                                </div>

                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                    <div className=" border border-dark border-1" style={{ width:'1150px', height:'145px', borderRadius:'20px', marginTop:'7%', marginLeft:'11%' }} >
                                        <h4 style={{ marginTop:'-3%', marginLeft:'2%', marginBottom:'1%' }} >Facilities </h4>
                                        <div className=" d-flex flex-row gap-3  " >
                                            <div className="faciloties-card  " >
                                                <img src='\src\assets\images\water.png' alt="swimmingpool" className="facilities-img" /> 
                                                <p style={{paddingTop:'2px'}}>24hr Water</p>
                                            </div>
                                            <div className="faciloties-card  " >
                                                <img src='\src\assets\images\power.png' alt="swimmingpool" className="facilities-img" /> 
                                                <p style={{paddingTop:'2px'}} >24hr Power</p>
                                            </div>
                                            <div className="faciloties-card  " >
                                                <img src='\src\assets\images\security.png' alt="swimmingpool" className="facilities-img" /> 
                                                <p style={{paddingTop:'2px'}}>Security Gard</p>
                                            </div>
                                            <div className="faciloties-card  " >
                                                <img src='\src\assets\images\motorcycle.png' alt="swimmingpool" className="facilities-img" /> 
                                                <p style={{paddingTop:'2px'}}>Parking</p>
                                            </div>
                                            <div className="faciloties-card  " >
                                                <img src='\src\assets\images\cctv.png' alt="swimmingpool" className="facilities-img" /> 
                                                <p style={{paddingTop:'2px'}}>CCTV </p>
                                            </div>
                                            <div className="faciloties-card  " >
                                                <img src='\src\assets\images\wifi.png' alt="swimmingpool" className="facilities-img" /> 
                                                <p style={{paddingTop:'2px'}}>WIFI</p>
                                            </div>
                                            <div className="faciloties-card  " >
                                                <img src='\src\assets\images\cleaning.png' alt="swimmingpool" className="facilities-img" /> 
                                                <p style={{paddingTop:'2px'}}>Cleaning</p>
                                            </div>

                                            
                                        </div>
                                    </div>
                                </div>



			)}

            <Parallax />
            <PropertyCarousel/>
            <div className=" border border-dark border-1" style={{ width:'1150px', height:'90px', borderRadius:'20px', marginTop:'7%', marginLeft:'11%', backgroundColor:'#f7dfdf' }} >
                <h4 style={{ marginTop:'-3.5%', marginLeft:'2%', marginBottom:'1%' }} >Places nearby </h4>
                <div className=" d-flex flex-row gap-3  " >
                    <div className="faciloties-card places-nearby  " >
                        <img src='\src\assets\images\metro.png' alt="swimmingpool" className="facilities-img" /> 
                        <p style={{paddingTop:'2px'}}>Metro</p>
                    </div>
                    <div className="faciloties-card places-nearby " >
                        <img src='\src\assets\images\hospital.png' alt="swimmingpool" className="facilities-img" /> 
                        <p style={{paddingTop:'2px'}} >Hospital</p>
                    </div>
                    <div className="faciloties-card places-nearby " >
                        <img src='\src\assets\images\busstop.png' alt="swimmingpool" className="facilities-img" /> 
                        <p style={{paddingTop:'2px'}}>Bus Stop</p>
                    </div>
                    <div className="faciloties-card places-nearby " >
                        <img src='\src\assets\images\restaurants.png' alt="swimmingpool" className="facilities-img" /> 
                        <p style={{paddingTop:'2px'}}>Restaurants</p>
                    </div>
                    <div className="faciloties-card places-nearby " >
                        <img src='\src\assets\images\atm.png' alt="swimmingpool" className="facilities-img" /> 
                        <p style={{paddingTop:'2px'}}>ATM</p>
                    </div>
                    <div className="faciloties-card places-nearby " >
                        <img src='\src\assets\images\supermarket.png' alt="swimmingpool" className="facilities-img" /> 
                        <p style={{paddingTop:'2px'}}>Super Market</p>
                    </div>
                    <div className="faciloties-card places-nearby " >
                        <img src='\src\assets\images\swimmingpool.png' alt="swimmingpool" className="facilities-img" /> 
                        <p style={{paddingTop:'2px'}}>Swimming pool</p>
                    </div>

                    
                </div>
            </div>
            </div>
            <div className=" d-flex flex-row justify-content-center  " ref={agent} >

                <div className=" border border-dark border-1 " style={{ width:'150px', height:'150px',borderRadius:'20px', marginTop:'12%'  }} >
                    <img src='\src\assets\images\dealer2.png' alt="dealer" style={{ width:'145px', height:'145px', marginLeft:'1.5%'  }}  /> 
                
                </div>
                <div className=" border border-dark border-1" style={{ width:'700px', height:'250px', borderRadius:'20px', marginTop:'7%', marginLeft:'5%' }}  >
                <img src='\src\assets\images\approved1.png' alt="dealer" style={{ width:'60px', height:'60px', marginLeft:'4px', marginTop:'3px'  }}  /> 
                    <div className=" d-flex " >
                        <div style={{marginLeft:'5%', marginTop:'1px'}} >
                            Agent
                            <h5>Name : {propertyInfo.dealer_name} </h5>
                            <p>Phn : +91 6108873834</p>
                            <p>Email : agent.properTestate@gmail.com</p>
                            <img src='\src\assets\images\rating.png' alt="dealer" style={{ width:'60px', height:'60px', marginLeft:'4px', marginTop:'-10%'  }}  /> 
                        </div>
                        <div >
                            <img src='\src\assets\images\certficate.png' alt="dealer" style={{ width:'125px', height:'105px', marginTop:'-10%', marginLeft:'180%'   }}  /> 
                            <div style={{marginTop:'18%', marginLeft:'180%'}}  >
                                <ModalCard
                                    show={show}
                                    onHide={() => setShow(false)}
                            
                                />
                            </div>
                        </div>
                    </div>
                    

                </div>
            </div>
            <div style={{height:'100px'}} ></div>
        </div>
    </>
	
    
						
  )
}

export default ViewProperty
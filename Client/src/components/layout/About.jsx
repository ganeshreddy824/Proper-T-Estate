import React from 'react'

const About = () => {
  return (
    <>
        <div id="aboutus" >
            <div style={{marginTop:'10%'}} >
                <div className=' mt-5 d-flex flex-row justify-content-center '>
                    <div style={{ width:'600px' }} ></div>
                    <div>
                        <h5>About Us</h5>
                        <div>
                            <h2>We Provide The Best Property <br />Property For You !</h2>
                            <p>They actually assumed me over and 
                                <br /> over that take little time off and 
                                <br /> come back and work. Fast forward 
                                <br /> tow week after
                                <br /> we are going for a new project.</p>
                            <p>I Wrote to let them know ready to <br /> come back they kicked.</p>
                            <div>
                                <button className=' text-center text-white shadow ' style={{ width:'120px', height:'30px', backgroundColor:'#F6995c', borderRadius:'20px', fontWeight:'bold', border:'#F6995c', borderWidth:'1px' }} >Learn More</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' mt-5 d-flex flex-row justify-content-around ' >
                    <div className=' pt-3 d-flex flex-column justify-content-center border border-dark text-center ' style={{ width:'400px', height:'170px', borderRadius:'30px' }} >
                        <h5>Make Your Dream True</h5>
                        <p>Have you ever heard the expression,<br/> " Do not count your chickens before they hatch? "</p>
                    </div>
                    <div className=' pt-3 d-flex flex-column justify-content-center border border-dark text-center ' style={{ width:'400px', height:'170px', borderRadius:'30px' }} >
                        <h5>Make Your Dream True</h5>
                        <p>Have you ever heard the expression,<br/> " Do not count your chickens before they hatch? "</p>
                    </div>
                    <div className=' pt-3 d-flex flex-column justify-content-center border border-dark text-center ' style={{ width:'400px', height:'170px', borderRadius:'30px' }} >
                        <h5>Make Your Dream True</h5>
                        <p>Have you ever heard the expression,<br/> " Do not count your chickens before they hatch? "</p>
                    </div>


                </div>
                <div style={{ height:'50px' }} ></div>
            </div>
        </div>

    </>
  )
}

export default About;
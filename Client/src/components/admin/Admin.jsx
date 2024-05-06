import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <section className='container mt-5'>
        <h2>Welcome to Admin Panel</h2>
        <hr/>
        <div className="d-grid gap-5 d-md-flex mt-2">
              <Link to={"/add-property"} className='contact-button' >
                  Add Properties
              
              </Link>
              <Link to={"/existing-properties"} className='contact-button' >
                  Existing Properties
              
              </Link>
        </div>
        <div style={{height:'470px'}} ></div>
    </section>
  )
}

export default Admin
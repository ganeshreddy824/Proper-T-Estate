import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";



export const api=axios.create({
    baseURL : "http://localhost:9000"
})

export const getHeader = () =>{
    const token = localStorage.getItem("token")
    return{
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    }
}
/* this function add property to the database*/
export async function addProperty(formData){
   
    

    return api.post("/Properties/addProperty", formData, {
        headers: {
            ...getHeader(),
            "Content-Type": "multipart/form-data",
          },
    })
}

/* This function get all property types from the database */
export async function getPropertyTypes(){
    try{
        const response =await api.get("/Properties/propertyTypes")
        return response.data
    }catch(error){
        throw new Error("Error fetching property types")
    }
}


/* This function get all properties from the database */
export async function getAllProperties(){
    try{
        const result= await api.get("/Properties/all-properties")
        return result.data
    }catch(error){
        throw new Error("Error fetching Properties")
    }
}

export async function deleteProperty(propertyId){
    try{
        const result = await api.delete(`/Properties/delete/property/${propertyId}`,{
            headers: getHeader(),
        })
        return result.data
    }catch(error){
            throw new Error(`Error deleting Property`)
    }
}

export async function updateProperty(propertyId, propertyData){
    const formData = new FormData()
    formData.append("name",propertyData.name)
    formData.append("area",propertyData.area)
    formData.append("facing",propertyData.facing)
    formData.append("address",propertyData.address)
    formData.append("dealer_name",propertyData.dealer_name)
    formData.append("measurements",propertyData.measurements)
    formData.append("image",propertyData.image)
    formData.append("propertyType",propertyData.propertyType)
    formData.append("propertyPrice",propertyData.propertyPrice)
    

    const response = await api.put(`/Properties/update/${propertyId}`, formData,{
        headers: {
            ...getHeader(),
            "Content-Type": "multipart/form-data"
        }
    })
   
    return response
}

export async function getPropertyById(propertyId){
    try{
        const result = await api.get(`/Properties/property/${propertyId}`)
        return result.data

    }catch(error){
        throw new Error(`Error fetching Property ${error.message}`)

    }
}


/* This function register a new user */
export async function registerUser(registration) {
    try {
      const response = await api.post("/auth/register-user", registration)
      console.log(response)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data)
      } else {
        throw new Error(`User registration error : ${error.message}`)
      }
    }
  }


  /* This function login a registered user */
  export async function loginUser(login) {
    try {
      const response = await api.post("/auth/login", login)
      if (response.status >= 200 && response.status < 300) {
        return response.data
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }

  /*  This is function to get the user profile */
  export async function getUserProfile(userId, token) {
    try {
      const response = await api.get(`users/profile/${userId}`, {
        headers: getHeader(),
      })
      return response.data
    } catch (error) {
      throw error
    }
  }


  /* This isthe function to delete a user */
export async function deleteUser(userId) {
    try {
      const response = await api.delete(`/users/delete/${userId}`, {
        headers: getHeader(),
      })
      return response.data
    } catch (error) {
      return error.message
    }
  }


  /* This is the function to get a single user */
export async function getUser(userId, token) {
    try {
      const response = await api.get(`/users/${userId}`, {
        headers: getHeader(),
      })
      return response.data
    } catch (error) {
      throw error
    }
  }


/*  bootstrap component */

export function ModalCard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleVisit=()=>{
    <NavLink  aria-current="page" to={"/alertModal"}>
    </NavLink>
    
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow} className="contact-button shadow" >
        Contact
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Dealer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                autoFocus
              />
              
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
              
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button  onClick={handleClose} className="contact-button shadow  " style={{backgroundColor:'#747170', borderColor:'#747170', borderWidth:'1px', fontWeight:'100px' }} >
            Close
          </Button>
          <Button  onClick={handleVisit} className="contact-button shadow ">
            Visit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
} 
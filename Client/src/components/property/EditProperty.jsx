import React, { useEffect } from 'react'
import { useState } from 'react'
import { getPropertyById, updateProperty } from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const EditProperty = () => {
    const [property, setProperty] = useState({
        image: "",
        name: "",
        area: "",
        facing: "",
        address: "",
        dealer_name: "",
        measurements: "",
        propertyType: "",
        propertyPrice: "",
        
    })
    

    const[imagePreview, setImagePreview] =useState("")
    const[successMessage, setSuccessMessage] =useState("")
    const[errorMessage,setErrorMessage] =useState("")

    const { propertyId } = useParams()

    const handleImageChange = (e) =>{
        const selectedImage = e.target.files[0]
        setProperty({...property, image: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleInputChange = (event) =>{
        const { name, value } = event.target
        setProperty({...property, [name]: value})
    }

    useEffect(()=>{
        const fetchRoom = async () => {
			try {
				const propertyData = await getPropertyById(propertyId)
                console.log(propertyData)
				setProperty(propertyData)
				setImagePreview(propertyData.image)
			} catch (error) {
				console.error(error)
			}
		}

		fetchRoom()
	}, [propertyId])

    const handleSubmit = async (e) =>{
        e.preventDefault()

        try{
            const response = await updateProperty(propertyId, property)
            if(response.status === 200){
                setSuccessMessage("Property Updated Successfully!")
                const updatedPropertyData = await getPropertyById(propertyId)
                console.log(updatedPropertyData)
                setProperty(updatedPropertyData)
                setImagePreview(updatedPropertyData.image)
                setErrorMessage("")
            }else{
                setErrorMessage("Error updateing Property")
            }
        }catch (error){
            console.error(error)
            setErrorMessage(error.message)
        }
    }
        return(
                <div >
                 <div className="container mt-5 mb-5 edit-form ">
                    <h3 className="text-center mb-5 pt-4">Edit Property</h3>
                     <div className="row justify-content-center">
                         
                         <div className="col-md-8 col-lg-6">
                                
                                 {successMessage && (
                                     <div className="alert alert-success" role='alert'>
                                        {successMessage}
                                        </div>
                                 )}
                                 {errorMessage && (
                                            <div className="alert alert-danger" role='alert'>
                                                {errorMessage}
                                            </div>

                                 )}
     
                                 <form onSubmit={handleSubmit}  >
                                         <div className="mb-3">
                                                     <label htmlFor="propertyType" className="form-label hotel-color">
                                                                 Property Type
                                                     </label>
                                                     <input
                                                                type="text"
                                                                className="form-control"
                                                                id="propertyType"
                                                                name="propertyType"
                                                                value={property.propertyType}
                                                                onChange={handleInputChange}
                                                            />  
                                         </div>
     
                                         <div className="mb-3">
                                                         <label htmlFor="propertyPrice" className="form-label hotel-color">
                                                                     Property Price
                                                         </label>
                                                         <input
                                                                
                                                                required
                                                                type="number"
                                                                id="propertyPrice"
                                                                name="propertyPrice"
                                                                className="form-control"
                                                                value={property.propertyPrice}
                                                                onChange={handleInputChange}
     
     
                                                         />
     
                                         </div>
     
     
                                         <div className="mb-3">
                                                 <label htmlFor="name" className="form-label hotel-color">
                                                             Property Name
                                                 </label>
                                                 <input
                                                         required
                                                         type="text"
                                                         className="form-control"
                                                         id="name"
                                                         name="name"
                                                         value={property.name}
                                                        onChange={handleInputChange}
     
                                                 />
     
                                         </div>
     
     
                                         <div className="mb-3">
                                                 <label htmlFor="area" className="form-label hotel-color">
                                                             Area
                                                 </label>
                                                 <input
                                                         required
                                                         type="text"
                                                         className="form-control"
                                                         id="area"
                                                         name="area"
                                                         value={property.area}
                                                        onChange={handleInputChange}
     
                                            />
     
                                         </div>
     
     
                                         <div className="mb-3">
                                                 <label htmlFor="facing" className="form-label hotel-color">
                                                             Facing
                                                 </label>
                                                 <input
                                                         required
                                                         type="text"
                                                         className="form-control"
                                                         id="facing"
                                                         name="facing"
                                                         value={property.facing}
                                                         onChange={handleInputChange}
     
                                                 />
     
                                         </div>
     
     
                                         <div className="mb-3">
                                                     <label htmlFor="address" className="form-label hotel-color">
                                                                 Address
                                                     </label>
                                                     <input
                                                             required
                                                             type="text"
                                                             className="form-control"
                                                             id="address"
                                                             name="address"
                                                             value={property.address}
                                                             onChange={handleInputChange}
     
                                                     />
     
                                         </div>
     
                                         <div className="mb-3">
                                                         <label htmlFor="dealer_name" className="form-label hotel-color">
                                                                     Dealer Name
                                                         </label>
                                                         <input
                                                                 required
                                                                 type="text"
                                                                 className="form-control"
                                                                 id="dealer_name"
                                                                 name="dealer_name"
                                                                 value={property.dealer_name}
                                                                 onChange={handleInputChange}
     
                                                         />
     
                                         </div>
     
     
                                         <div className="mb-3">
                                                             <label htmlFor="measurements" className="form-label hotel-color">
                                                                         Measurements
                                                             </label>
                                                             <input
                                                                     required
                                                                     type="text"
                                                                     className="form-control"
                                                                     id="measurements"
                                                                     name="measurements"
                                                                     value={property.measurements}
                                                                     onChange={handleInputChange}
     
                                                             />
     
                                         </div>

     
                                         <div className="mb-3">
                                                     <label htmlFor="image" className="form-label hotel-color">
                                                                 Property Image
                                                     </label>
                                                     <input
                                                             required
                                                             type="file"
                                                             className="form-control"
                                                             id="image"
                                                             name="image"
                                                             onChange={handleImageChange}
     
                                                     />
                                                     {imagePreview &&(
                                                         <img
                                                             src={`data:image/jpeg;base64,${imagePreview}`}
                                                             alt="Property Preview"
                                                             style={{ maxWidth: "400px", maxHeight: "400px" }}
                                                             className="mt-3"
                                                         />
                                                     )}
     
                                         </div>
     
                                         <div className="d-grid gap-2 d-md-flex mt-2">
                                 
                                            <Link to={"/existing-properties"} className="btn btn-outline-info ml-5">
                                                back
                                            </Link>
                                            <button type="submit" className="btn btn-outline-warning">
                                                Edit Property
                                            </button>
                                         </div>
                                 </form>
                         </div>
                     </div>
                 </div>
                </div> 
            
         )
}

export default EditProperty
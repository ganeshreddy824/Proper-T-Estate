import React, { useState } from "react";
import { addProperty } from "../utils/ApiFunctions";
import PropertyTypeSelector from "../common/PropertyTypeSelector";
import { Link } from "react-router-dom";

const AddProperty = () =>{
    const [newProperty,setNewProperty] = useState({
        image : null,
        name : "",
        area : "",
        facing : "",
        address : "",
        dealer_name : "",
        measurements : "",
        propertyType : "",
        propertyPrice : "",

    })

    const[imagePreview, setImagePreview] =useState("")
    const[successMessage, setSuccessMessage] =useState("")
    const[errorMessage,setErrorMessage] =useState("")

    const handlePropertyInputChange =(e) =>{
                const name=e.target.name
                let value=e.target.value
                if (name === "propertyPrice") {
                    if (!isNaN(value)) {
                        value = parseInt(value);
                    } else {
                        value = ""
                    }
                }
                
                setNewProperty({...newProperty, [name]: value})
        }

        const handleImageChange = (e) =>{
            const selectedImage = e.target.files[0]
            setNewProperty({...newProperty, image: selectedImage})
            setImagePreview(URL.createObjectURL(selectedImage))
        }

        const handleSubmit = async (e) =>{
            e.preventDefault()
            try{
                const formData = new FormData()
                formData.append("image",newProperty.image)
                formData.append("name",newProperty.name)
                formData.append("area",newProperty.area)
                formData.append("facing",newProperty.facing)
                formData.append("address",newProperty.address)
                formData.append("dealer_name",newProperty.dealer_name)
                formData.append("measurements",newProperty.measurements)
                formData.append("propertyType",newProperty.propertyType)
                formData.append("propertyPrice",newProperty.propertyPrice)
                const success= await addProperty(formData)
                if(success !== undefined){
                    setSuccessMessage("A new Property was added to the database")
                    setNewProperty({image : null,
                                    name : "",
                                    area : "",
                                    facing : "",
                                    address : "",
                                    dealer_name : "",
                                    measurements : "",
                                    propertyType : "",
                                    propertyPrice : ""})
                    setImagePreview("")
                    setErrorMessage("")
                }else{
                    setErrorMessage("Error Adding New Property")
                }
            }catch (error){
                setErrorMessage(error.message)
            
            }
            setTimeout(() => {
                setSuccessMessage("")
                setErrorMessage("")
            }, 3000)
    }
    return(
       <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    
                    <div className="col-md-8 col-lg-6 form-card ">
                            <h2 className="mt-5 mb-2">Add a New Property</h2>
                            {successMessage && (
                                <div className="alert alert-success fade show">
                                    {successMessage}
                                </div>
                            )}
                            {errorMessage && (
                                <div className="alert alert-danger fade show">
                                    {errorMessage}
                                </div>)}

                            <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                                <label htmlFor="propertyType" className="form-label">
                                                            Property Type
                                                </label>
                                                <input
                                                           
                                                           required
                                                           type="text"
                                                           id="propertyType"
                                                           
                                                           name="propertyType"
                                                           className="form-control  "
                                                           value={newProperty.propertyType}
                                                           onChange={handlePropertyInputChange}


                                                    />
                                                    <div>
                                                           {/* <PropertyTypeSelector
                                                                handlePropertyInputChange={handlePropertyInputChange}
                                                                newProperty={newProperty}
                                                           /> */}
                                                           {/* <PropertyTypeSelector
                                                                handlePropertyInputChange={handlePropertyInputChange}
                                                                newProperty={newProperty}
                                                           /> */}

                                                    </div>
                                    </div>

                                    <div className="mb-3">
                                                    <label htmlFor="propertyPrice" className="form-label">
                                                                Property Price
                                                    </label>
                                                    <input
                                                           
                                                           required
                                                           type="number"
                                                           id="propertyPrice"
                                                           
                                                           name="propertyPrice"
                                                           className="form-control"
                                                           value={newProperty.propertyPrice}
                                                           onChange={handlePropertyInputChange}


                                                    />

                                    </div>


                                    <div className="mb-3">
                                            <label htmlFor="name" className="form-label">
                                                        Property Name
                                            </label>
                                            <input
                                                    required
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    value={newProperty.name}
                                                    onChange={handlePropertyInputChange}

                                            />

                                    </div>


                                    <div className="mb-3">
                                            <label htmlFor="area" className="form-label">
                                                        Area
                                            </label>
                                            <input
                                                    required
                                                    type="text"
                                                    className="form-control"
                                                    id="area"
                                                    name="area"
                                                    value={newProperty.area}
                                                    onChange={handlePropertyInputChange}/>

                                            

                                    </div>


                                    <div className="mb-3">
                                            <label htmlFor="facing" className="form-label">
                                                        Facing
                                            </label>
                                            <input
                                                    required
                                                    type="text"
                                                    className="form-control"
                                                    id="facing"
                                                    name="facing"
                                                    value={newProperty.facing}
                                                    onChange={handlePropertyInputChange}

                                            />

                                    </div>


                                    <div className="mb-3">
                                                <label htmlFor="address" className="form-label">
                                                            Address
                                                </label>
                                                <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        id="address"
                                                        name="address"
                                                        value={newProperty.address}
                                                        onChange={handlePropertyInputChange}

                                                />

                                    </div>

                                    <div className="mb-3">
                                                    <label htmlFor="dealer_name" className="form-label">
                                                                Dealer Name
                                                    </label>
                                                    <input
                                                            required
                                                            type="text"
                                                            className="form-control"
                                                            id="dealer_name"
                                                            name="dealer_name"
                                                            value={newProperty.dealer_name}
                                                            onChange={handlePropertyInputChange}

                                                    />

                                    </div>


                                    <div className="mb-3">
                                                        <label htmlFor="measurements" className="form-label">
                                                                    Measurements
                                                        </label>
                                                        <input
                                                                required
                                                                type="text"
                                                                className="form-control"
                                                                id="measurements"
                                                                name="measurements"
                                                                value={newProperty.measurements}
                                                                onChange={handlePropertyInputChange}

                                                        />

                                    </div>

                                    <div className="mb-3">
                                                <label htmlFor="image" className="form-label">
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
                                                        src={imagePreview}
                                                        alt="Previous Property Image"
                                                        style={{maxWidth: "400px", maxHeight: "400px"}}
                                                        className="mb-3 mt-5"
                                                    />
                                                )}

                                    </div>

                                    


                                    <div className="d-grid gap-2 d-md-flex mt-2">
                                        <Link to={"/existing-properties"} className="btn btn-outline-info">
                                                        Back 

                                        </Link>
                            
                                            <button type="submit" className="btn btn-outline-primary ml-5">
                                                Save Property
                                            </button>
							        </div>
                            </form>
                    </div>
                </div>
            </section>
       </>
    )
}

export default AddProperty
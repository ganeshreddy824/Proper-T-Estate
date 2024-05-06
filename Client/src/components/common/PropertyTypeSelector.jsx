import React, { useEffect, useState } from "react";
import { getPropertyTypes } from "../utils/ApiFunctions";

const PropertyTypeSelector = ({handlePropertyInputChange, newProperty}) =>{
     const[propertyTypes,setPropertyTypes] = useState([""])
     const[showNewPropertyTypeInput, setShowNewPropertyTypeInput] = useState(false)
     const[newPropertyType, setNewPropertyType] = useState("")

     useEffect(() =>{
        getPropertyTypes().then((data) =>{
            setPropertyTypes(data)
        })
     },[])

     const handleNewPropertyTypeInputChange = (e) =>{
        setNewPropertyType(e.target.value);
     }

     const handleAddNewPropertyType = () =>{
        if(newPropertyType !== ""){
            setPropertyTypes([...propertyTypes, newPropertyType])
            setNewPropertyType("")
            setShowNewPropertyTypeInput(false)
        }
     }
     return(
        <>
                {propertyTypes.length > 0 && (
				<div>
					<select
						required
						className="form-select"
						id="propertyType"
						name="propertyType"
						value={newProperty.propertyType}
						onChange={(e) => {
							if (e.target.value === "Add New") {
								setShowNewPropertyTypeInput(true)
							} else {
								handlePropertyInputChange(e)
							}
						}}>
						
						<option value={""}>Select a Property type</option>
						<option value={"Add New"}>Add New</option>
						{propertyTypes.map((type, index) => (
							<option key={index} value={type}>
								{type}
							</option>
						))}
					</select>
					{showNewPropertyTypeInput && (
						<div className="mt-2">
							<div className="input-group">
								<input
									type="text"
									className="form-control"
									placeholder="Enter New Property Type"
									value={newPropertyType}
									onChange={handleNewPropertyTypeInputChange}
								/>
								<button className="btn btn-hotel" type="button" onClick={handleAddNewPropertyType}>
									Add
								</button>
							</div>
						</div>
					)}
				</div>
			)}
		</>
        
     )
}
export default PropertyTypeSelector
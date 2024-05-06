import React from "react";
import { useState } from "react";

const PropertyFilter = ({data, setFilteredData}) =>{

    const[filter, setFilter] = useState("")

    const handleSelectChange = (e) =>{

        const selectedPropertyType = e.target.value
                setFilter(selectedPropertyType)


        const filteredProperties = data.filter((property) => 
                property.propertyType.toLowerCase()
                .includes(selectedPropertyType.toLowerCase()))
                setFilteredData(filteredProperties)
    }

    const clearFilter =()=>{
        setFilter("")
        setFilteredData(data)
    }
     const propertyTypes = ["", ...new Set(data.map((property) => property.propertyType))]

     return(
        <>
             <div className="input-group  mb-5" style={{ width:'450px', height:'40px ', marginLeft:'-60px' }} >
			<span className="input-group-text" id="room-type-filter">
				Filter Properties by type
			</span>
			<select
				className="form-select"
				aria-label="property type filter"
				value={filter}
				onChange={handleSelectChange}>
				<option value="">select a Property type to filter....</option>
				{propertyTypes.map((type, index) => (
					<option key={index} value={String(type)}>
						{String(type)}
					</option>
				))}
			</select>
			<button className="btn btn-hotel" type="button" onClick={clearFilter}>
				Clear Filter
			</button>
		</div>
        </>
     )


}
export default PropertyFilter
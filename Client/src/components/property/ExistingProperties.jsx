import React, { useEffect, useState } from "react"
import PropertyPaginator from "../common/PropertyPaginator"
import { deleteProperty, getAllProperties } from "../utils/ApiFunctions"
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa"
import { Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import PropertyFilter from "../common/PropertyFilter"


const ExistingProperties = () => {

    const [properties, setProperties] = useState([{	id : "",
													name : "",
													area : "",
													facing : "",
													address : "",
													dealer_name : "",
													measurements : "",
													propertyType : "",
													propertyPrice : ""}])
	const [currentPage, setCurrentPage] = useState(1)
	const [propertiesPerPage] = useState(8)
	const [isLoading, setIsLoading] = useState(false)
	const [filteredProperties, setFilteredProperties] = useState([{	id : "",
																	name : "",
																	area : "",
																	facing : "",
																	address : "",
																	dealer_name : "",
																	measurements : "",
																	propertyType : "",
																	propertyPrice : ""}])
	const [selectedPropertyType, setSelectedPropertyType] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")

	useEffect(() =>{
		fetchProperties()
	},[])

    const fetchProperties = async () => {
		setIsLoading(true)
		try {
			const result = await getAllProperties()
			setProperties(result)
			setIsLoading(false)
		} catch (error) {
			setErrorMessage(error.message)
			setIsLoading(false)
		}
	}

	useEffect(() =>{
		if(selectedPropertyType === ""){
			setFilteredProperties(properties)
		}else{
			const filtered =properties.filter(
				(property) => property.propertyType === selectedPropertyType)
			setFilteredProperties(filtered)
		}
		setCurrentPage(1)
	},[properties, selectedPropertyType])

	const handlePaginationClick = (pageNumber) =>{
		setCurrentPage(pageNumber)
	}

	const handleDelete = async (propertyId) => {
		try {
			const result = await deleteProperty(propertyId)
			if (result === "") {
				setSuccessMessage(`Property No ${propertyId} was delete`)
				fetchProperties()
			} else {
				console.error(`Error deleting Property : ${result.message}`)
			}
		} catch (error) {
			setErrorMessage(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
	}


	const claculateTotalPagea = (filteredProperties, propertiesPerPage, properties) =>{
		const totalProperties = filteredProperties.length > 0 ? filteredProperties.length : properties.length 
		return Math.ceil(totalProperties / propertiesPerPage)
	}

	const indexOfLastProperty = currentPage * propertiesPerPage
	const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage
	const  currentProperties   = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty)


    return (
        <>

			<div className="container col-md-8 col-lg-6">
				{successMessage && (
							<p className="alert alert-success mt-5">{successMessage}</p>
				)}

				{errorMessage && (
							<p className="alert alert-danger mt-5">{errorMessage}</p>
				)}
			</div>

			


			{isLoading ? (
				<p>Loading existing properties</p>
			) : (
				<>
					<section className="mt-5 mb-5 container">
						<div className="d-flex justify-content-between mb-3 mt-5">
							<h2>Existing Properties</h2>

						</div>

						<Row>
							<Col md={6} className="mb-2 md-mb-0">
								<PropertyFilter data={properties} setFilteredData={setFilteredProperties}/>
							
							</Col>
							<Col md={6} className="d-flex justify-content-end">
									<Link to={"/add-Property"} className="contact-button" >
											<FaPlus/> Add Property
									</Link>
							</Col>

				
						</Row>


						<table className="table table-bordered table-hover">
							<thead>
								<tr className="text-center">
									<th>ID</th>
									<th>Property Name</th>
									<th>Area</th>
									<th>Facing</th>
									<th>Address</th>
									<th>Dealer Name</th>
									<th>Measurements</th>
									<th>Property Type</th>
									<th>Property Price</th>
									<th>Actions</th>
								</tr>
							</thead>

							<tbody>
								{currentProperties.map((property) => (
									<tr key={property.id} className="text-center">
										<td>{property.id}</td>
										<td>{property.name}</td>
										<td>{property.area}</td>
										<td>{property.facing}</td>
										<td>{property.address}</td>
										<td>{property.dealer_name}</td>
										<td>{property.measurements}</td>
										<td>{property.propertyType}</td>
										<td>{property.propertyPrice}</td>

										<td className=" d-flex  gap-2 justify-content-center align-items-center ">
											<Link to={`/edit-property/${property.id}`} className=" d-flex gap-2  ">
												
												<span className="btn btn-warning btn-sm ml-5">
													<FaEdit />
												</span>
											</Link>
											<button
												className="btn btn-danger btn-sm ml-5"
												onClick={() => handleDelete(property.id)}
											>
												<FaTrashAlt />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
								<PropertyPaginator
											currentPage={currentPage}
											totalPages={claculateTotalPagea(filteredProperties, propertiesPerPage, properties)}
											onPageChange={handlePaginationClick}
								/>

						</section>
						</>
			)}
        </>
    )
}
export default ExistingProperties
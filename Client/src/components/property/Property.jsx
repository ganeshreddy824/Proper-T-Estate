import React from 'react'
import { useState, useEffect } from 'react'
import { getAllProperties } from "../utils/ApiFunctions"
import PropertyCard from './PropertyCard'
import PropertyPaginator from "../common/PropertyPaginator"
import PropertyFilter from "../common/PropertyFilter"
import { Col, Container, Row } from "react-bootstrap"


const Property = () => {
    const [data, setData] = useState([])
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [propertiesPerPage] = useState(6)
	const [filteredData, setFilteredData] = useState([{ id: "" }])

    useEffect(() => {
		setIsLoading(true)
        getAllProperties()
                        .then((data) =>{
                            setData(data)
                            setFilteredData(data)
                            setIsLoading(false)

        } )
        .catch((error) =>{
            setError(error.message)
            setIsLoading(false)
        })

	}, [])

    if (isLoading) {
		return <div>Loading Properties.....</div>
	}

	if (error) {
		return <div className=" text-danger">Error : {error}</div>
	}

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

    const totalPages = Math.ceil(filteredData.length / propertiesPerPage)

    const renderProperties = () =>{
        const startIndex = (currentPage -1) * propertiesPerPage
        const endIndex = startIndex + propertiesPerPage
        return filteredData
                    .slice(startIndex, endIndex)
                    .map((property) => <PropertyCard key={property.id} property={property}/>)
    }

  return (
                    <Container>
                    <Row>
                        <Col md={6} className="mb-3 mb-md-0">
                            <PropertyFilter data={data} setFilteredData={setFilteredData}/>
                        </Col>

                        <Col md={6} className="d-flex align-items-center justify-content-end">
                            <PropertyPaginator
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </Col>
                    </Row>

                    <Row>{renderProperties()}</Row>

                    <Row>
                        <Col md={6} className="d-flex align-items-center justify-content-end">
                            <PropertyPaginator
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                            />
                        </Col>
                    </Row>
                </Container>
  )
}

export default Property
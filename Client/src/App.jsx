import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import React from "react"
import AddProperty from "./components/property/AddProperty"
import ExistingProperties from "./components/property/ExistingProperties"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import EditProperty from "./components/property/EditProperty"
import Home from "./components/home/Home"
import Footer from "./components/layout/Footer"
import NavBar from "./components/layout/NavBar"
import PropertyListing from "./components/property/PropertyListing"
import Admin from "./components/admin/Admin"
import Login from "./components/auth/Login"
import Registration from "./components/auth/Registration"
import Profile from "./components/auth/Profile"
import { AuthProvider } from "./components/auth/AuthProvider"
import RequireAuth from "./components/auth/RequireAuth"
import ViewProperty from "./components/property/ViewProperty"
import Property from "./components/property/Property"
import { ModalCard } from "./components/utils/ApiFunctions"
import AlertModal from "./components/bootstrap-components/AlertModal"



function App() {
  return (
	<AuthProvider>
		<main>
			<Router>

				<NavBar/>
					<Routes>
						<Route path="/" element={<Home/>}/>
						<Route path="/edit-property/:propertyId" element={<EditProperty/>}/>
						<Route path="/existing-properties" element={<ExistingProperties/>}/>
						<Route path="/add-Property" element={<AddProperty/>}/>
						<Route
							path="/view-property/:propertyId"
							element={
								<RequireAuth>
									<ViewProperty/>
								</RequireAuth>
							}
						/>
						<Route path="/browse-all-properties" element={<PropertyListing/>}/>
						<Route path="/admin" element={<Admin/>}/>
						<Route path="/login" element={<Login/>}/>
						<Route path="/register" element={<Registration/>}/>
						<Route path="/profile" element={<Profile/>}/>
						<Route path="/dealer" element={<ModalCard/>}/>
						<Route path="/alertModal" element={<AlertModal/>}/>

						
					</Routes>
				<Footer/>
			</Router>

			
		</main>

	</AuthProvider>
	)
}

export default App

import React, { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'
import Logout from "../auth/Logout"
import { AuthContext } from '../auth/AuthProvider'

const NavBar = () => {

    const [showAccount, setShowAccount] = useState(false)

    const {user} = useContext(AuthContext)

	const handleAccountClick = () => {
		setShowAccount(!showAccount)
	}

    const isLoggedIn = user !== null
    const userRole = localStorage.getItem("userRole")

     return (
        <nav className="navbar navbar-expand-lg  px-3 shadow mt-0 sticky-top"  >

                <div className="container-fluid">
                            <Link to={"/"} className="navbar-brand">
                                <span className="hotel-color  ">Proper-T-Estate</span>
                            </Link>

                <button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarScroll"
					aria-controls="navbarScroll"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

                <div className="collapse navbar-collapse" id="navbarScroll">
                   <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                            

                    {isLoggedIn && userRole === "ROLE_ADMIN" && (
							<li className="nav-item"  >
								<NavLink className="nav-link" aria-current="page" to={"/admin"}>
									Admin
								</NavLink>
							</li>
                    )}
					
					</ul>

                    <ul className="d-flex navbar-nav  ">
                        <li className="nav-item ">
							<a href="home" className="nav-link"  >
								Home
							</a>
						</li>
                        <li className="nav-item">
							<a href="aboutus" className="nav-link" >
								AboutUs
							</a>
						</li>
                        
                        <li className="nav-item">
							<a href="service" className="nav-link" >
								Service
							</a>
						</li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to={"/browse-all-properties"}>
                                    Browse Properties
                            </NavLink>
                        </li>

						<li className="nav-item dropdown">
							<a
                                 className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                                 href="#"
                                 id="navbarDropdown"
                                 role="button"
                                 data-bs-toggle="dropdown"
                                 aria-expanded="false"
                                 onClick={handleAccountClick}>
								 {" "}
								Acount
							</a>

                            <ul className={`dropdown-menu ${showAccount ? "show" : ""}`}
                                 aria-labelledby="navbarDropdown">
                                {isLoggedIn ? (
									<Logout />
								) : (
                                <li>
                                        <Link className="dropdown-item" to={"/login"}>
                                            Login
                                        </Link>
                                </li>
                                )}
                               
                            </ul>
						</li>
					</ul>
                </div>

            </div>
        </nav>
  )
}

export default NavBar
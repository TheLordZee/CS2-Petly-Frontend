import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, NavItem, Collapse, NavbarToggler } from "reactstrap";
import "./NavBar.css";
import { useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = ({currUser, signout}) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
  return(
      <div>
        <Navbar expand="md" className="sticky-top">
          <NavLink exact to="/" className="navbar-brand ms-2">
            Petly
          </NavLink>
          <button onClick={toggle} aria-label="Toggle navigation" type="button" class="mr-2 navbar-toggler">
              <span class="Navbar-toggler"><FontAwesomeIcon icon={faBars}/></span>
            </button>
          <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto Nav-collapse" navbar>
                <NavItem className="nav-item">
                    <NavLink to="/pets/1">Pets</NavLink>
                </NavItem>
                <NavItem className="nav-item ">
                    <NavLink to="/organizations/1">Organizations</NavLink>
                </NavItem>
                <NavItem className="nav-item">
                    <div className="dropdown">
                      <button className="btn dropdown-toggle nav-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Breeds
                      </button>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="/pets/dogs/breeds">Dog Breeds</a>
                        <a className="dropdown-item" href="/pets/cats/breeds">Cat Breeds</a>
                      </div>
                    </div>
                </NavItem>
            {(currUser !== undefined) ? 
              <>
              <NavItem className="nav-item">
                <NavLink to="/profile">Profile</NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <Link to="" onClick={signout}>Log Out {currUser.username}</Link>
              </NavItem>  
              </>
              :
              <>
              
              <NavItem className="nav-item">
                <NavLink to="/login">Login</NavLink>
              </NavItem>  
              <NavItem className="nav-item">
                <NavLink to="/signup">Sign Up</NavLink>
              </NavItem>  
              </>
            }
            
          </Nav>
          </Collapse>
          
        </Navbar>
      </div>
  );
}
  
export default NavBar;
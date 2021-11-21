import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, NavItem, Collapse, NavbarToggler } from "reactstrap";
import "./NavBar.css";
import { useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocalStorage } from "./helpers";
import { useHistory } from "react-router";

const NavBar = ({setUser}) => {
    const [isOpen, setIsOpen] = useState(false)
    const {getCurrUser, logout} = useLocalStorage()
    const history = useHistory();
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    
    const signout = () => {
      logout();
      history.push('/');
      setUser({})
    }
    const currUser = getCurrUser();
    console.log(currUser)
  return(
      <div>
        <Navbar expand="md" className="sticky-top">
          <NavLink exact to="/" className="navbar-brand ms-2">
            Petly
          </NavLink>
          <button onClick={toggle} aria-label="Toggle navigation" type="button" className="mr-2 navbar-toggler">
              <span className="Navbar-toggler"><FontAwesomeIcon icon={faBars}/></span>
            </button>
          <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto Nav-collapse" navbar>
                <NavItem className="nav-item">
                    <NavLink to="/pets?page=1">Pets</NavLink>
                </NavItem>
                <NavItem className="nav-item ">
                    <NavLink to="/organizations/page/1">Organizations</NavLink>
                </NavItem>
                
            {(currUser) ? 
              <>
              <NavItem className="nav-item">
                <NavLink to={`/users/${currUser.username}`}>Profile</NavLink>
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
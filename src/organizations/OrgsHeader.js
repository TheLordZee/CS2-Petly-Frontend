import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, NavItem} from "reactstrap";
import "../NavBar.css";
import states from "../states";
import "./OrgsHeader.css"

const OrgsHeader = ({currState, handleClick, setCurrState, setQuery, query, handleChange}) => {
    return(
        <Navbar expand="md" className="sticky-top p-2">
            
          <Nav className="" navbar>
                <NavItem className="nav-item me-4">
                    <NavLink to="/organizations/page/1" onClick={() => {
                      setCurrState({})
                      setQuery(null)
                    }}>Organizations</NavLink>
                </NavItem>
                <NavItem className="nav-item">
                    <div className="dropdown ">
                      <button className="btn dropdown-toggle nav-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <label for="states">Filter By State: {currState.name}</label>
                      </button>
                      <div className="dropdown-menu overflow-hidden" aria-labelledby="dropdownMenuButton">
                          <select id="states" name="states" size="10">
                            {Object.keys(states).map(state => {
                                return <option onClick={handleClick} value={state}>{states[state]}</option>
                            })}
                          </select>
                      </div>
                    </div>
                </NavItem>
               
          </Nav>
          <Nav className="ms-auto"> 
            <NavItem>
                <input 
                  value={query} 
                  onChange={handleChange} 
                  placeholder="search"
                  className="form-control Orgs-search"
                />
            </NavItem>
          </Nav>
        </Navbar>
    )
}

export default OrgsHeader
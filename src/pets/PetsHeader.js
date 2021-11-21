import React, {useState} from "react";
import { Navbar } from "reactstrap";
import states from "../states";
import "./PetsHeader.css"
import FilterForm from "./FilterForm";

const PetsHeader = ({formData, onChange, setFormData}) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    return(
        <Navbar expand="md" className="sticky-top p-2">
  
          <div className="dropdown">
            <button className="btn dropdown-toggle nav-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <label for="states">Filters</label>
            </button>
            <div className="dropdown-menu overflow-hidden" aria-labelledby="dropdownMenuButton">
              <FilterForm formData={formData} onChange={onChange}/>            
            </div>
          </div>
          <button className="btn btn-light ms-auto" onClick={() => setFormData({page: 1})}>Remove Filters</button>
          
        </Navbar>
    )
}

export default PetsHeader
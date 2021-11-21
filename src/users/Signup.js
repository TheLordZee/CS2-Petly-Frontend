import React, {useState, useEffect} from "react";
import { useHistory } from "react-router";
import SignupForm from "./SignupForm";
import { useLocalStorage } from "../helpers";
import PetlyApi from "../petlyApi";

const Signup = ({setUser}) => {
    const INITIAL_ERROR = {error: false, msg: ""}
    const INITIAL_STATE = {
        username: "", 
        password: "",
        firstName: "", 
        lastName: "", 
        username: "", 
        address: "", 
        email: "", 
        phone: "", 
        birthDay: ""
    }
    const {
        setCurrUser, 
        setToken
    } = useLocalStorage();
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [error, setError] = useState(INITIAL_ERROR);
    const history = useHistory();
  
    const onChange = e => {
        let {name, value} = e.target;
        setFormData(fD => ({
            ...fD,
            [name]: value
        }));
    }
  
    const returnHome = () => {
        history.push("/");
    }
  
    const signup = async () => {
        for(let key of Object.keys(formData)){
            if(formData[key] === ""){
                error.error = true;
                error.msg = "All inputs must be filled!";
            }
        }

        if(formData.password.length < 5){
            error.error = true;
            error.msg = "Password must be longer than 5 characters!";
        }

        setError(error);
        if(!error.error){
            let token = await PetlyApi.register(formData);
            let currUser = await PetlyApi.getUser(formData.username);
            setCurrUser(currUser);
            setToken(token);
            setFormData(INITIAL_STATE);
            setUser(currUser);
            setError(INITIAL_ERROR);
            returnHome();
        }
    }
  
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        signup();
    }

    return(<>
            <h1>Sign Up!</h1>
            <SignupForm 
                onChange={onChange} 
                handleSubmit={handleSubmit} 
                formData={formData} 
                error={error}
            />
        </>
    )
}

export default Signup;
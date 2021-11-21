import LoginForm from "./LoginForm";
import { useState } from "react";
import { useLocalStorage } from "../helpers";
import { useHistory } from "react-router";
import PetlyApi from "../petlyApi";

const Login = ({setUser}) => {
    const INITIAL_ERROR = {error: false, msg: ""}
    const INITIAL_STATE = {
        username: "", 
        password: ""
    }
    const history = useHistory()
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [error, setError] = useState(INITIAL_ERROR);
    const {
        setCurrUser, 
        setToken
    } = useLocalStorage();

    const login = async () => {
        if(formData.password === "" || formData.username === ""){
            error.error = true;
            error.msg = "All inputs must be filled!";
        }
        if(!error.error){
            try{
                let token = await PetlyApi.authenticate(formData);
                let currUser = await PetlyApi.getUser(formData.username);
                setCurrUser(currUser);
                setToken(token);
                setFormData(INITIAL_STATE);
                setError(INITIAL_ERROR);
                history.push("/")
                setUser(currUser);
            } catch(err){
                console.log(err);
                error.error = true;
                error.msg = "Either username or password is incorrect.";
            }
        }
        setError(error);
    }

    const onChange = e => {
        let {name, value} = e.target;
        setFormData(fD => ({
            ...fD,
            [name]: value
        }));
        console.log(formData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        login();
    }
    return(<>
            <h1>Login!</h1>
            <LoginForm 
                handleSubmit={handleSubmit} 
                onChange={onChange} 
                formData={formData} 
                error={error}
            />
        </>
    )
}

export default Login;
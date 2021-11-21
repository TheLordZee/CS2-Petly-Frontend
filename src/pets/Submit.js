import React, {useState, useEffect} from "react";
import { useHistory } from "react-router";
import { useLocalStorage } from "../helpers";
import PetlyApi from "../petlyApi";
import SubmitForm from "./SubmitForm";

const Submit = ({user}) => {
    const INITIAL_ERROR = {error: false, msg: ""}
    const REQUIRED = [
        "type",
        "species",
        "age",
        "sex",
        "size",
        "coat",
        "colors",
        "name"
    ]
    const INITIAL_STATE = {
        userId : user.id, 
        url : "", 
        type: "dog",
        species : "", 
        age : "baby", 
        sex : "male", 
        size : "smal", 
        coat : "short", 
        colors : "", 
        name : "", 
        description : "", 
        photos : null, 
        videos : null, 
        status : "Adoptable", 
        location: "AK",
        tags : [], 
        breeds : [], 
        environments : [], 
        attributes : []
    }
    const [error, setError] = useState(INITIAL_ERROR);
    const [formData, setFormData] = useState(INITIAL_STATE);

    const onChange = e => {
        console.log(e)
        let {name, value} = e.target;
        const currFD = formData
        delete currFD.limit;
        switch(name){
            case "attributes":
            case "breeds":
            case "environments":
                setFormData({
                    ...currFD,
                    [name]:(currFD[name]) ? (!currFD[name].includes(value)) ? [...currFD[name], value] : [...currFD[name].filter(i => i !== value)] : [value]
                });
                break;
            case "type":
                setFormData({
                    ...currFD,
                    breeds: [],
                    type: value
                })
                break;
            case "tags":
                setFormData({
                    ...currFD,
                    tags: value.replace(" ", "").split(",")
                })
                break;
            default:
                setFormData({
                    ...currFD,
                    [name]: value
                });
        }
    }

    const handleSubmit = async (e) => {
        console.log(e)
        e.preventDefault();
        for(let key of Object.keys(formData)){
            if(REQUIRED.includes(key) && formData[key] === ""){
                error.error = true;
                error.msg = `${key} input must be filled!`;
            }
        }

        setError(error);
        if(!error.error){
            const petData = {...formData}
            if(petData.photos){
                petData.photos = JSON.stringify(petData.photos.split(","))
            }
            if(petData.videos){
                petData.videos = JSON.stringify(petData.videos.split(","))
            }
            let colors = petData.colors.split(",")
            let primary = colors.pop()
            let colorData = {primary, others: colors}
            petData.colors = JSON.stringify(colorData)
            console.log(petData)
            let pet = await PetlyApi.createPet(petData)
            console.log(pet)
            setFormData(INITIAL_STATE);
            setError(INITIAL_ERROR);
        }
    }
    console.log(formData)
    return(<div className="mt-3">
        <h2>Submit A Pet</h2>
        <SubmitForm 
            formData={formData} 
            onChange={onChange} 
            handleSubmit={handleSubmit}
            error={error}
        />
        </div>
    )
}

export default Submit
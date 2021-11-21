import states from "../states";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { useEffect, useState } from "react";
import PetFinderApi from "../petFinder";

const FilterForm = ({onChange, formData}) => {
    const [breeds, setBreeds] = useState([])
    useEffect(() => {
        const getBreeds = async() => {
            const b = await PetFinderApi.getBreeds(formData.type)
            console.log(b)
            setBreeds(b)
        }
        if(formData.type){
            getBreeds();
        }
    }, [formData])
        
    
    return(
        <Form>
            <FormGroup>
                <Label htmlFor="state">State:</Label>
                <Input type="select" name="location" id="state" onChange={onChange} value={formData.state}>
                    {Object.keys(states).map(state =>  
                        <option value={state}>{states[state]}</option>
                    )}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="type">Type:</Label>
                <Input type="select" name="type" id="type" onChange={onChange} value={formData.type}>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="rabbit">Rabbit</option>
                    <option value="horse">Horse</option>
                    <option value="small-furry">Small And Furry</option>
                    <option value="bird">Bird</option>
                    <option value="scales-fins-other">Scales, Fins, and Others</option>
                    <option value="barnyard">Barnyard</option>
                </Input>
            </FormGroup>
            {(breeds.length > 0) ? <FormGroup>
                <Label htmlFor="breeds">Breeds:</Label>
                <Input type="select" name="breeds" multiple id="breed" onChange={onChange} value={formData.breeds}>
                    {breeds.map(b =>  
                        <option>{b.name}</option>
                    )}
                </Input>
            </FormGroup>: ""}
            <FormGroup>
                <Label htmlFor="environments">Environments:</Label>
                <Input type="select" name="environments" multiple id="environments" onChange={onChange} value={formData.environments}>
                    <option value="dogs">Good With Dogs</option>
                    <option value="children">Good With Kids</option>
                    <option value="cats">Good With Cats</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="attributes">Attributes:</Label>
                <Input type="select" name="attributes" multiple id="attributes" onChange={onChange} value={formData.attributes}>
                    <option value="spayed_neutered">Spayed/Neutered</option>
                    <option value="house_trained">House Trained</option>
                    <option value="declawed">Declawed</option>
                    <option value="special_needs">Special Needs</option>
                    <option value="shots_current">Shots Up To Date</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="tags">Tags:</Label>
                <Input name="tags" id="tags" onChange={onChange} value={formData.tags} placeholder="Comma Seperated Tags"/>
            </FormGroup>
        </Form>)
}

export default FilterForm;
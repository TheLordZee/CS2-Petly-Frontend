import states from "../states";
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import { useEffect, useState } from "react";
import PetFinderApi from "../petFinder";

const SubmitForm = ({onChange, formData, handleSubmit, error}) => {
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
        <Form onSubmit={handleSubmit}>
            {(error.error) ? 
                <Alert color="danger">
                    {error.msg}
                </Alert>
                : null
            }
            <FormGroup >
                <Label htmlFor="name">Name:</Label>
                <Input name="name" onChange={onChange} value={formData.name}/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="state">State:</Label>
                <Input 
                    type="select" 
                    name="location" 
                    id="state" 
                    onChange={onChange} 
                    value={formData.state}
                >
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
                    <option value="small-furry">Small And Furry</option>
                    <option value="bird">Bird</option>
                    <option value="horse">Horse</option>
                    <option value="scales-fins-other">Scales, Fins, and Others</option>
                    <option value="barnyard">Barnyard</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="colors">Colors:</Label>
                <Input 
                    name="colors" 
                    id="colors" 
                    onChange={onChange} 
                    value={formData.colors}
                    placeholder="Comma Seperated Colors"
                />
            </FormGroup>

            <FormGroup >
                <Label htmlFor="species">Species:</Label>
                <Input name="species" onChange={onChange} value={formData.species}/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="sex">Gender:</Label>
                <Input 
                    type="select" 
                    name="sex" 
                    id="sex" 
                    onChange={onChange} 
                    value={formData.gender}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unknown">Unknown</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="age">Age:</Label>
                <Input 
                    type="select" 
                    name="age" 
                    id="age" 
                    onChange={onChange} 
                    value={formData.age}
                >
                    <option value="baby">Baby</option>
                    <option value="young">Young</option>
                    <option value="adult">Adult</option>
                    <option value="senior">Senior</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="size">Size:</Label>
                <Input 
                    type="select" 
                    name="size" 
                    id="size" 
                    onChange={onChange} 
                    value={formData.size}
                >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xlarge">Extra Large</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="coat">Coat:</Label>
                <Input 
                    type="select" 
                    name="coat" 
                    id="coat" 
                    onChange={onChange} 
                    value={formData.coat}
                >
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                    <option value="wire">Wire</option>
                    <option value="hairless">Hairless</option>
                    <option value="curly">Curly</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="breeds">Breeds:</Label>
                <Input 
                    type="select" 
                    name="breeds" 
                    multiple 
                    id="breed" 
                    onChange={onChange} 
                    value={formData.breeds}
                >
                    {(breeds.length > 0) ? breeds.map(b =>  
                        <option>{b.name}</option>
                    ): "Please Select A Type"}
                </Input>
            </FormGroup>
            
            <FormGroup>
                <Label htmlFor="environments">Environments:</Label>
                <Input 
                    type="select" 
                    name="environments" 
                    multiple 
                    id="environments" 
                    onChange={onChange} 
                    value={formData.environments}
                >
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
                <Input 
                    name="tags" 
                    id="tags" 
                    onChange={onChange} 
                    value={formData.tags} 
                    placeholder="Comma Seperated Tags"
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="photos">Photos:</Label>
                <Input 
                    name="photos" 
                    id="photos" 
                    onChange={onChange} 
                    value={formData.photos} 
                    placeholder="Comma Seperated Links to Photos"
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="videos">Videos:</Label>
                <Input 
                    name="videos" 
                    id="videos" 
                    onChange={onChange} 
                    value={formData.videos} 
                    placeholder="Comma Seperated Links to Videos"
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="url">Url:</Label>
                <Input 
                    name="url" 
                    id="url" 
                    onChange={onChange} 
                    value={formData.url}
                />
            </FormGroup>

            <button className="btn btn-danger mb-5">Submit</button>
        </Form>
    )
}

export default SubmitForm; 
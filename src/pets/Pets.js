import PetFinderApi from "../petFinder";
import PetlyApi from "../petlyApi";
import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router";
import PetCard from "./PetCard";
import "./Pets.css"
import PetsHeader from "./PetsHeader";
import { makeFilter, createQueryParams } from "../helpers";


const Pets = () => {
    const history = useHistory();
    const [userPets, setUserPets] = useState([]);
    const [orgPets, setOrgPets] = useState([]);
    const search = useLocation().search;
    const [query, setQuery] = useState(search)
    const filter = makeFilter(search);
    const [formData, setFormData] = useState(filter)

    useEffect(() => {
        async function getPets() {
            const uPets = await PetlyApi.getPets(filter);
            setUserPets(uPets);
            if(uPets.length < 20){
                filter.limit = 20 - uPets.length
                const oPets = await PetFinderApi.getAnimals(filter);
                setOrgPets(oPets);
            }
        }
        getPets();
    }, [query])

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

    useEffect(() => {
        const currQ = createQueryParams(formData)
        history.push(`/pets?${currQ}`)
        setQuery(currQ)
    }, [formData])
    
    return(<>
        <PetsHeader formData={formData} onChange={onChange} setFormData={setFormData}/>
        <div className="container Pets">
            {userPets.map(p => <PetCard pet={p} src="user"/>)}
            {orgPets.map(p => <PetCard pet={p} src="org"/>)}
        </div>
        {(userPets.length + orgPets.length === 0) ? <h1>No Pets Found</h1> : ""}
        {(+filter.page > 1) ? <a className="btn fw-bold fs-3" href={`/pets?page=${+filter.page-1}${search.replace(`?page=${filter.page}`, "")}`}>{"<"}</a> : ""}

            <span className="mx-4 fw-bold">{filter.page}</span>

            {(orgPets.length + userPets.length === 20) ?
            <a className="btn fw-bold fs-3" href={`/pets?page=${+filter.page + 1}${search.replace(`?page=${filter.page}`, "")}`}>{">"}</a> 
            : ""}
        
        
    </>)
}

export default Pets;
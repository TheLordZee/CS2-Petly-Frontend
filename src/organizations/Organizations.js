import React, {useState, useEffect} from "react";
import PetFinderApi from "../petFinder";
import { useParams, useLocation } from "react-router-dom";
import OrganizationCard from "./OrganizationCard";
import OrgDetails from "./OrgDetails";
import { ListGroup, ListGroupItem} from "reactstrap";
import "./Orgs.css"
import { getLatLng } from "../helpers";
import OrgsHeader from "./OrgsHeader";
import states from "../states";
import { useHistory } from "react-router";

const Organizations = () => {
    const [organizations, setOrganizations] = useState([]);
    const [currState, setCurrState] = useState({
        name: "",
        abbr: ""
    });
    const [query, setQuery] = useState(null)
    const [active, setActive] = useState({})
    const history = useHistory()
    let {page} = useParams();
    page = parseInt(page);
    const search = useLocation().search;
    const state = new URLSearchParams(search).get('state');
    const queryParam = new URLSearchParams(search).get('query');
    
    if(state && !currState){
        setCurrState({
            name: states[state],
            abbr: state
        })
    }
    if(queryParam && !query){
        setQuery(queryParam)
    }
    
    
    useEffect(() => {
        async function getOrganizations(){
            await PetFinderApi.getToken()
            const o = await PetFinderApi.getOrganizations(page, state, query)

            setOrganizations(o)
        }
        getOrganizations();
    }, [currState, query])

    

    useEffect(() => {
        async function makeActive(){
            if(organizations[0]){
                await getLatLng(organizations[0].address)
                setActive(organizations[0])
            }
        }
        makeActive();
    }, [organizations])
    
    const handleClick = async (id) => {
        const o = await PetFinderApi.getOrganization(id)
        await getLatLng(o.address)
        setActive(o)
    }

    const handleHeaderClick = (e) => {
        history.push(`/organizations/1?state=${e.target.value}`)
        setCurrState({
            name: e.target.innerText,
            abbr: e.target.value
        })
    }

    const handleChange = (e) => {
        const val = e.target.value;
        let q = ""
        if(currState.abbr){
            q += `state=${currState.abbr}`
        }
        if(currState && query){
            q += "&"
        }
        q += `query=${val}`
        history.push(`/organizations/1?${q}`)
        setQuery(val)
    }
    return(
        <>
            
            <div className="container">
            <OrgsHeader 
                currState={currState} 
                query={query}
                handleClick={handleHeaderClick}
                setCurrState={setCurrState}
                setQuery={setQuery}
                handleChange={handleChange}
            />
            {(organizations.length > 0) ?                 
            <div className="row ">
                    <ListGroup className="Orgs col-4 overflow-auto Orgs-container">
                    {organizations.map(o => (
                        <ListGroupItem>
                            <OrganizationCard 
                                organization={o} 
                                onClick={() => handleClick(o.id)} 
                                key={o.id} 
                                active={o.id === active.id}
                            />
                        </ListGroupItem>
                    ))}
                    </ListGroup>
                    <div className="col-8 overflow-auto Orgs-container">
                        {(active.name) ? <OrgDetails org={active}/> : ""}
                    </div>
            </div> : 
            <h1>Unfortunately, we couldn't find any Organizations with that criteria</h1>
            }

            </div>
            {(page > 1) ? (state) ?
            <a className="btn fw-bold fs-3" href={`/organizations/${page-1}?state=${state}`}>{"<"}</a> 
            : <a className="btn fw-bold fs-3" href={`/organizations/${page-1}`}>{"<"}</a> 
            : ""}

            <span className="mx-4 fw-bold">{page}</span>

            {(organizations.length === 20) ? (state) ?
            <a className="btn fs-3 fw-bold" href={`/organizations/page/${page+1}?state=${state}`}>{">"}</a> 
            : <a className="btn fw-bold fs-3" href={`/organizations/page/${page+1}`}>{">"}</a> 
            : ""}
        </>
    )
}

export default Organizations;
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import Map from "./Map"
import Contact from "../Contact";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PetFinderApi from "../petFinder";
import { getLatLng } from "../helpers";

const OrgDetails = ({org}) => {
    const [currOrg, setCurrOrg] = useState({});
    const [latLng, setLatLng] = useState({});
    let {orgId} = useParams();
    useEffect(() => {
        async function setUp() {
            const o = await PetFinderApi.getOrganization(id)
            setCurrOrg(o)
        }
        if(!currOrg.name){
            setUp()
        }
    }, [])
    console.log(currOrg)
    const {id, name, address, photos, mission_statement, adoption, email, hours, phone, social_media, website} = org || currOrg;
    if(address && !latLng.lat){
        async function getLtLng(){
            const ll = await getLatLng(address)
            setLatLng(ll)
        }
        getLtLng()
    }
    
    return (
        <>
        <Card className="OrgDetails-card">
            <h2>{name}</h2>
            <img 
                className="OrgDetails-img" src={(photos) ? (photos[0] ? photos[0].full : "") : ""}
            />
            {(address) ? <h3>{address.city}, {address.state}</h3> : ""}
            {(website) ? <a 
                        className="btn btn-primary" 
                        href={website}>
                            Visit Website
                        </a> 
            : ""}
            <a 
                className="btn btn-danger" 
                href={`/pets?page=1&organization=${id}`}>
                    See Pets
            </a>
            {(mission_statement) ? <>
                <h4>Mission:</h4>
                <CardBody className="fw-bold">
                    {mission_statement}
                </CardBody></> 
            : ""}
            {(adoption) ? <>
                <h5>Policy:</h5>
                <p>{adoption.policy}</p>
                {(adoption.url) ? <p>
                    MORE INFO AT: <a href={adoption.url}>{adoption.url}</a>
                </p>: ""}
            </> : ""}
            
            
            {(address) ?<> 
                <Contact className="Org-contact" contactInfo={{address, email, phone, social_media}}/>
                <Map latLng={latLng}/> 
            </>: ""}
            
        </Card>
        </>
    )
}

export default OrgDetails;
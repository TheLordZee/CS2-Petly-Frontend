import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import Map from "./Map"


const OrgDetails = ({org}) => {
    const {id, name, address, photos, mission_statement, adoption, email, hours, phone, social_media, website} = org;
    const latLng = JSON.parse(localStorage.getItem('latLng'))
    return (
        <>
        <Card>
            <h2>{name}</h2>
            <img src={(photos) ? (photos[0] ? photos[0].full : "") : ""}/>
            {(address) ? <h3>{address.city}, {address.state}</h3> : ""}
            {(website) ? <a className="btn btn-primary" href={website}>Visit Website</a> : ""}
            <a className="btn btn-danger" href={`/pets/1?organization=${id}`}>See Pets</a>
            {(mission_statement) ? <>
                <h4>Mission:</h4>
                <CardBody className="fw-bold">
                    {mission_statement}
                </CardBody></> 
            : ""}
            {(adoption.policy) ? <>
                <h5>Policy:</h5>
                <p>{adoption.policy}</p>
                {(adoption.url) ? <p>
                    MORE INFO AT: <a href={adoption.url}>{adoption.url}</a>
                </p>: ""}
            </> : ""}
            <div className="Org-contact">
                <h5>Contact Info:</h5>
                <p><span>Address:</span> {address.address1} {address.city} {address.state} {address.postcode}</p>
                {(email) ? <p><span>Email:</span> {email}</p> : ""}
                {(phone) ? <p><span>Phone:</span> {phone}</p> : ""}
                {(social_media.facebook) ? <p>
                    <span>Facebook:</span> 
                    <a href="">{social_media.facebook}</a>
                </p> : ""}
                {(social_media.instagram) ? <p>
                    <span>Instagram:</span> 
                    <a href="">{social_media.instagram}</a>
                </p> : ""}
                {(social_media.pinterest) ? <p>
                    <span>Pinterest:</span> 
                    <a href="">{social_media.pinterest}</a>
                </p> : ""}
                {(social_media.twitter) ? <p>
                    <span>Twitter:</span> 
                    <a href="">{social_media.twitter}</a>
                </p> : ""}
                {(social_media.youtube) ? <p>
                    <span>YouTube:</span> 
                    <a href="">{social_media.youtube}</a>
                </p> : ""}
            </div>
            {(address) ? <Map latLng={latLng}/> : ""}
            
        </Card>
        </>
    )
}

export default OrgDetails;
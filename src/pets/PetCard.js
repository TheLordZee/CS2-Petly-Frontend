import React from "react";
import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import "./PetCard.css"
const PetCard = ({pet, src, username}) => {
    const {id, name, type, age, breeds, contact, primary_photo_cropped, photos, location} = pet;
    return(
        <a href={`/pets/${src}/${id}`} className="mb-4">
          <Card id={id} className="PetCard">
            <CardImg 
                alt="pet image"
                src={(primary_photo_cropped) ? primary_photo_cropped.full :  (photos[0]) ? photos[0] :"https://clipartix.com/wp-content/uploads/2016/10/Cougar-paw-print-clip-art-clipart.png"}
            />
            <CardBody>
              <CardTitle className="font-weight-bold">
                {name}
              </CardTitle>
              <CardText>{age} <span>-</span><span className="ms-2">{type}</span><span>-</span>
              <span className="ms-2">
                {(breeds) ? breeds.primary || breeds[0] : ''}
                </span></CardText>
              <CardText>{(contact) ? <>{contact.address.city}, {contact.address.state}</> : location}</CardText>
            </CardBody>
          </Card>
        </a>  
    )
}

export default PetCard;
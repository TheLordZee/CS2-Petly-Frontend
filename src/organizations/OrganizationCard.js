import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { useHistory } from "react-router";
import "./OrgCard.css"

const OrganizationCard = ({organization, onClick, active}) => {
    const {id, name, address, photos} = organization;

    return(
        <section className="OrgCard">
          <Card onClick={onClick} id={id} className={(active) ?"text-light Org-card Org-active" : "text-light Org-card"}>
          {(photos[0]) ? <img className="OrgCard-img" src={photos[0].small}/> : ""}
            <CardBody className={(active) ?" Org-card Org-body Org-active" : " Org-card Org-body"}>
              <CardTitle className="font-weight-bold">
                {name}
              </CardTitle>
              <CardText>{address.city}, {address.state}</CardText>
            </CardBody>
          </Card>
        </section>        
    )
}

export default OrganizationCard;
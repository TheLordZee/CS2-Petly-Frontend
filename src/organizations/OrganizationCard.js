import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { useHistory } from "react-router";
import "./OrgCard.css"

const OrganizationCard = ({organization, onClick, active}) => {
    const {id, name, address} = organization;
    const history = useHistory()

    return(
        <section>
          <Card onClick={onClick} id={id} className={(active) ?"text-light Org-card Org-active" : "text-light Org-card"}>
            <CardBody className={(active) ?" Org-card Org-active" : " Org-card"}>
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
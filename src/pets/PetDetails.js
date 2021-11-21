"use strict";
import { useParams, useLocation } from "react-router";
import React, { useState, useEffect } from "react";
import PetFinderApi from "../petFinder";
import PetlyApi from "../petlyApi";
import { Carousel, CarouselControl, CarouselItem, CarouselIndicators } from "reactstrap";
import Contact from "../Contact";
import "./PetDetails.css"
import OrganizationCard from "../organizations/OrganizationCard";

const PetDetails = () => {
    const {id} = useParams();
    let [pet, setPet] = useState({})
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [org, setOrg] = useState({})
    useEffect(() => {
        async function getPet() {
            let p = await PetFinderApi.getAnimal(id);
            console.log(p)
            setPet(p)
        }
        getPet()
    }, [])
    let {age, breeds, coat, colors, contact, description, environment, gender, organization_id, photos, published_at, size, species, status, tags, type, url, name, attributes} = pet;
 
    if(description){
        description = description.replace("&#039;", "'")
    }

    
    useEffect(() => {
        async function getOrg() {
            const o = await PetFinderApi.getOrganization(organization_id)
            setOrg(o)
        }
        getOrg();
    }, [pet])
        
    
    let items = [];
    if(photos){
        items = photos.map((p) => {
            return(
                <CarouselItem key={p.full}>
                    <img className="PetDetails-imgs" src={p.full}/>
                </CarouselItem>
            )
        })
    }

    const itemLength = items.length - 1
    const previousButton = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ?
            itemLength : activeIndex - 1;
        setActiveIndex(nextIndex);
    }
    const nextButton = () => {
        if (animating) return;
        const nextIndex = activeIndex === itemLength ?
            0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    let environments = "";
    if(environment){
        Object.keys(environment).map((e) =>{
            if(environment[e]){
              environments += `${e} `
            }  
          })
    }

    return(<>
            <h1 className="display-3">Meet {name}</h1>
            <Carousel 
                className="PetDetails-carousel" 
                previous={previousButton} 
                next={nextButton}
                activeIndex={activeIndex}
            >
                <CarouselIndicators 
                    items={items}
                    activeIndex={activeIndex}
                    onClickHandler={(newIndex) => {
                        if (animating) return;
                        setActiveIndex(newIndex);
                    }} 
                />
                {items}
                {(items.length > 1) ? 
                <>
                    <CarouselControl directionText="Prev"
                        direction="prev" 
                        onClickHandler={previousButton} />
                    <CarouselControl directionText="Next"
                        direction="next" 
                        onClickHandler={nextButton} /> 
                </>
                :
                ""}
            </Carousel>
            <br />
            <div className="PetDetails">
                <div className="PetDetails-title">
                    <h3 className="mt-4 display-6">{age} - {(breeds) ? <>
                        <span className="ms-2">
                          
                            {breeds.primary} {(breeds.mixed) ? "Mix" : ""}
                        </span> 
                        </>: ""}
                    
                    </h3>
                    <h5>{gender} - {size} {(contact) ? `- ${contact.address.city}, ${contact.address.state}` : ""} -{(colors) ? <><span className="ms-2">{colors.primary}</span></> : "" }</h5>
                </div>
                <p className="mt-4">{description}</p>
                <a className="btn btn-primary" href={url}>Learn More</a>
                
                <div className="row PetDetails-row">
                <h3 className="">About:</h3>
                    <div className="col-6 PetDetails-column">
                        {(attributes) ? Object.keys(attributes).map((a) => {
                            if(attributes[a] !== null){
                                return(<>
                                    <p className="PetDetails-attribute text-capitalize">{a.replace("_", " ")}:</p>
                                    <p className="text-capitalize">{`${attributes[a]}`}</p>
                                </>)
                            }
                        }) : ""}
                    </div>
                    <div className="col-6 PetDetails-column">
                        {(environments !== "") ? <>
                            <p className="PetDetails-attribute">Good in an environment with:</p>
                            <p className="text-capitalize">
                            {environments}
                            </p>
                            </>
                        : ""}
                        <p className="PetDetails-attribute">Coat:</p>
                        <p>{coat}</p>
                        {(tags) ? 
                            <>
                                <p className="PetDetails-attribute">Characteristics:</p>
                                {tags.map(t => t + " ")}
                            </>
                        : ""}
                    </div>
                </div>
                <div className="PetDetails-contact">
                    <div className="me-5">
                        {(contact) ? <Contact contactInfo={contact}/> : ""}
                    </div>
                    <div>
                        {(org) ? (org.name) ? <a href={`/organizations/id/${org.id}`}>
                            <OrganizationCard className="PetDetails-org"  organization={org}/> 
                        </a>: "" : ""}
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default PetDetails;
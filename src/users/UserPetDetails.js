"use strict";
import { useParams, useLocation } from "react-router";
import React, { useState, useEffect } from "react";
import PetlyApi from "../petlyApi";
import { Carousel, CarouselControl, CarouselItem, CarouselIndicators } from "reactstrap";

const UserPetDetails = () => {
    const {id} = useParams();
    const [pet, setPet] = useState({})
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    useEffect(() => {
        async function getPet() {
            let p = await PetlyApi.getPet(id);
            console.log(p);
            setPet(p);
        }
        getPet()
    }, []);
    useEffect(() => {
        function parseJson() {
            console.log(pet)
            if(pet.photos){
                setPet({...pet, photos: JSON.parse(photos)})
            }
            if(pet.colors){
                setPet({...pet, colors: JSON.parse(colors)})
                
            }
        }
        parseJson()
    }, [])
    
    let {age, attributes, breeds, coat, colors, description, environments, location, name, photos, sex, size, species, status, tags, type, uploaded, url, userId, videos} = pet;
    
    let items = photos || [];
    const itemLength = (photos) ? photos.length - 1 : 0;
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

    let environment = "";
    if(environments){
        environments.map(e => environment += `${e} `)
    }

    return(<>
            <h1 className="display-3">Meet {name}</h1>
            <Carousel className="PetDetails-carousel" previous={previousButton} next={nextButton}
                activeIndex={activeIndex}>
                <CarouselIndicators items={items}
                    activeIndex={activeIndex}
                    onClickHandler={(newIndex) => {
                        if (animating) return;
                        setActiveIndex(newIndex);
                    }} />
                {(photos) ? photos.map((p) => {
                    return(
                        <CarouselItem key={p}>
                            <img className="PetDetails-imgs" src={p}/>
                        </CarouselItem>
                    )
                }) : []}
                {(itemLength > 1) ? 
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
                           {breeds[0]} 
                        </span> 
                        </>: ""}
                    
                    </h3>
                    <h5>{sex} - {size} - {location} - {(colors) ? <><span className="ms-2">{colors.primary}</span></> : "" }</h5>
                </div>
                <p className="mt-4">{description}</p>
                <a className="btn btn-primary" href={url}>Learn More</a>
                
                <div className="row PetDetails-row">
                <h3 className="">About:</h3>
                    <div className="col-6 PetDetails-column">
                        {(attributes) ? attributes.map((a) => {
                                return(<>
                                    <p className="PetDetails-attribute text-capitalize">{a.replace("_", " ")}:</p>
                                    <p className="text-capitalize">{`${attributes[a]}`}</p>
                                </>)
                        }) : ""}
                    </div>
                    <div className="col-6 PetDetails-column">
                        {(environment !== "") ? <>
                            <p className="PetDetails-attribute">Good in an environment with:</p>
                            <p className="text-capitalize">
                            {environment}
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
                {/* <div className="PetDetails-contact">
                    <div className="me-5">
                        {(contact) ? <Contact contactInfo={contact}/> : ""}
                    </div>
                    <div>
                        {(org) ? (org.name) ? <a href={`/organizations/id/${org.id}`}>
                            <OrganizationCard className="PetDetails-org"  organization={org}/> 
                        </a>: "" : ""}
                        
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default UserPetDetails;
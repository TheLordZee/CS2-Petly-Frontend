import React from "react"
import mainImg from "./imgs/pets.jpg"
import "./Home.css"
import Slider from "react-slick"
import { useLocalStorage } from "./helpers"

const Home = ({user}) => {
    const {getCurrUser} = useLocalStorage()
    const currUser = getCurrUser()
    console.log(currUser);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return(
        <div className="Home-main">
            <img className="Home-img" src={mainImg}/>
            <div className="Home">
                <h1>Petly</h1>
                <h2>Pets For Anyone</h2>
                {(currUser) ? <h2>Welcome Back, {currUser.username}</h2> : ""}

            <h3 className="mt-5">Pet Types</h3>
            <div className="pb-3 Home-slider">
              <Slider {...settings} className="Home-slider">
                <a href="/pets?page=1&type=dog">
                    <div className="slider-item">
                        Dog
                        <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/labrador-puppy-royalty-free-image-1626252338.jpg?crop=0.667xw:1.00xh;0.173xw,0&resize=640:*"/>
                    </div>
                </a>
                <a href="/pets?page=1&type=cat">
                    <div className="slider-item">
                        Cat
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjATKMvP5zBGNRh8hR0LJpo5zgiEB-G-d2yw&usqp=CAU"/>
                    </div>
                </a>
                <a href="/pets?page=1&type=rabbit">
                    <div className="slider-item">
                        Rabbit
                        <img src="data:image/jpeg;base64,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"/>
                    </div>
                </a>
                <a href="/pets?page=1&type=small-furry">
                    <div className="slider-item">
                        Small & Furry
                        <img src="https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc0Mzg2MjUxNzk1ODAxNDQ4/health-problems-in-pet-mice.jpg"/>
                    </div>
                </a>
                <a href="/pets?page=1&type=horse">
                    <div className="slider-item">
                        Horse
                        <img src="https://nationaltoday.com/wp-content/uploads/2020/12/National-Horse-Day-1-300x300.jpg"/>
                    </div>
                </a>
                <a href="/pets?page=1&type=bird">
                    <div className="slider-item">
                        Bird
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1dL4DMqTTMxvKuvzKuD7lUyDY6H8TDY_S2Q&usqp=CAU"/>
                    </div>
                </a>
                <a href="/pets?page=1&type=scales-fins-other">
                    <div className="slider-item">
                        Scales, Fins & Other
                        <img src="https://reptilesmagazine.com/wp-content/uploads/data-import/6fd47469/leopard-gecko-shutterstock603461384.jpg"/>
                    </div>
                </a>
                <a href="/pets?page=1&type=barnyard">
                    <div className="slider-item">
                        Barnyard
                        <img src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/feed/feednavigator.com/news/r-d/how-can-the-prenatal-phase-influence-the-lifelong-performance-of-a-pig/8769254-1-eng-GB/How-can-the-prenatal-phase-influence-the-lifelong-performance-of-a-pig.jpg"/>
                    </div>
                </a>
              </Slider>
            </div>
            </div>
        </div>
    )
}

export default Home;
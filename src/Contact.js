import "./Contact.css"

const Contact = ({contactInfo}) => {
    const {address, social_media, email, phone} = contactInfo;
    return (
        <div className="Contact">
        <h5>Contact Info:</h5>
        <p><span>Address:</span> {address.address1} {address.city} {address.state} {address.postcode}</p>
        {(email) ? <p><span>Email:</span> {email}</p> : ""}
        {(phone) ? <p><span>Phone:</span> {phone}</p> : ""}
        {(social_media) ? <>
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
        </>: ""}
        </div>
    )
}


export default Contact;
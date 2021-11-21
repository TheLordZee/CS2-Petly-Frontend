import "./UserDetails.css"

const UserDetails = ({user}) => {
    const {username,
    firstName,
    lastName,
    address,
    email,
    phone,
    pets,
    birthDay} = user;
    return(
        <div className="mt-3">
            <div className="row">
                <div className="col-6 UserDetails-section">
                    <h3>Details:</h3>
                    <div className="UserDetails-info">
                        <p>Username: {username}</p>
                        <p>Name: {firstName} {lastName}</p>
                        <p>Birth Day: {birthDay}</p>
                        <p>Number of Pets: {(pets) ? pets.length : ""}</p>
                    </div>
                </div>
                <div className="col-6 UserDetails-section">
                    <h3>Contact:</h3>
                    <div className="UserDetails-info">
                        <p>Address: {address}</p>
                        <p>Email: {email}</p>
                        <p>Phone: {phone}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetails;
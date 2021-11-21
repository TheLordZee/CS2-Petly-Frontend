import PetCard from "../pets/PetCard";
import { ListGroup, ListGroupItem} from "reactstrap";

const UserPets = ({pets, username}) => {
    return (
        <div className="container">
            <h2>Pets:</h2>
            {(pets.length === 0) ? <h2>This User Hasn't Uploaded Any Pets</h2>: ""}
            <ListGroup>
            {pets.map(p =>
                <ListGroupItem> 
                    <PetCard pet={p} src="user" />
                </ListGroupItem>
            )}
            </ListGroup>
        </div>
    )
}

export default UserPets;
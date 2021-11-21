import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import PetlyApi from "../petlyApi";
import "./Profile.css"
import UserPets from "./UserPets";
import ProfileForm from "./ProfileForn";
import { useLocalStorage } from "../helpers";
import UserDetails from "./UserDetails";
import Submit from "../pets/Submit";

const Profile = () => {
    const {username} = useParams()
    const [user, setUser] = useState({})
    const [selection, setSelection] = useState("profile")
    const {getCurrUser, logout} = useLocalStorage()
    const history = useHistory()
    const currUser = getCurrUser();
    useEffect(() => {
        async function getUser() {
            const u = await PetlyApi.getUser(username)
            setUser(u)
        }
        getUser()
    }, [])
    async function deleteUser() {
        await PetlyApi.deleteUser(username)
        logout()
        history.push("/")
    }
    return(
        <div className="Profile mt-2">
            <img className="Profile-pic" src={user.profilePic || "https://www.pinclipart.com/picdir/big/527-5271537_dog-paw-printing-cat-clip-art-clip-art.png"}/>
            <h1>{user.username}</h1>
            <div className="Profile-bar">
                <btn className="btn" onClick={() => setSelection("profile")}>Profile</btn>
                <btn className="btn" onClick={() => setSelection("pets")}>Pets</btn>
                {(currUser.username) === (user.username) ? <>
                    <btn className="btn" onClick={() => setSelection("edit")}>Edit</btn>
                    <btn className="btn" onClick={() => setSelection("submit")}>Submit</btn>
                    <btn className="btn" onClick={deleteUser}>Delete</btn>
                    </>
                :""}
            </div>
            {(selection === "profile") ? 
                <UserDetails user={user}/>
            :""}
            {(selection === "pets") ? 
                <UserPets pets={user.pets} username={username}/>
            :""}
            {(selection === "edit") ? 
                <ProfileForm user={user}/>
            :""}
            {(selection === "submit") ?
                <Submit user={user}/>
            :""}
        </div>
    )
}

export default Profile;
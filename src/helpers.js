import axios from 'axios';
import { GOOGLE_KEY } from './config';

async function getLatLng(address) {
    const {address1, address2, city, country, postcode, state} = address;
    const addressLine = (typeof(address1) === 'string') ? address1.replaceAll(" ", "+") : "";
    const cityLine = city.replaceAll(" ", "+")
    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressLine}+${cityLine}+${state}&key=${GOOGLE_KEY}`)
    const latLng  = res.data.results[0].geometry.location
    const latLngStr = JSON.stringify(latLng)
    localStorage.setItem('latLng', latLngStr)
    return latLng
}

const createQueryParams = (filter) =>{
    const parameters = [
        "page", "organization", "type", "size", "gender", "age", "coat", "name", "location", "good_with_children", "good_with_dogs", "good_with_cats", "house_trained", "declawed", "special_needs", "tag"
    ]
    let res = ""
    for(let key of Object.keys(filter)){
        if(parameters.includes(key)){
            res += `${key}=${filter[key]}&`   
        } else {
            switch(key){
                case "environments":
                    for(let i = 0; i < filter[key].length; i++){
                        switch(filter[key][i]){
                            case "children":
                                res += "good_with_children=true&"
                                break;
                            case "dogs":
                                res += "good_with_dogs=true&"
                                break;
                            case "cats":
                                res += "good_with_cats=true&"
                                break;
                        }
                    }
                    break;
                case "attributes":
                    for(let i = 0; i < filter[key].length; i++){
                        res += `${filter[key][i]}=true&`
                    }
                    break;
                case "breeds":
                case "tags":
                    let param = `${key.replace("s", "")}=`
                    for(let i = 0; i < filter[key].length; i++){
                        param += filter[key][i];
                        if(filter[key][i + 1]){
                            param += ","
                        }
                    }
                    res += param + "&";
                    break;
            }
        }
    }
    console.log(res)
    return res;
}

function makeFilter(search){
    const validParams = ["page", "organization", "type", "breed", "size", "gender", "age", "coat", "name", "good_with_children", "good_with_dogs", "good_with_cats", "house_trained", "declawed", "special_needs", "tag", "location"]
    const filter = {};
    const environments = [];
    const attributes = [];
    let tags = [];
    let breeds = [];
    for(let param of validParams){
        const p = new URLSearchParams(search).get(param)
        if(p){
            switch(param){
                case "good_with_children":
                case "good_with_dogs":
                case "good_with_cats":
                    environments.push(p)
                    filter.environments = environments;
                    break;
                case "tag":
                    tags = p.split(",")
                    filter.tags = tags;
                    break;
                case "breed":
                    breeds = p.split(",")
                    filter.breeds = breeds;
                    break;
                case "spayed_neutered":
                case "house_trained":
                case "declawed":
                case "special_needs":
                case "shots_current":
                    attributes.push(param)
                    filter.attributes = attributes;
                    break;
                default:
                    filter[param] = p;
            }
        }
    }

    return filter
}

const useLocalStorage = () => {
    
    const getCurrUser = () => {
        let user = localStorage.getItem("currUser");
        return JSON.parse(user)
    }

    const getToken = () => {
        return localStorage.getItem("token");
    }

    const setToken = (token) => {
        localStorage.setItem("token", token);
    }

    const setCurrUser = (currUser) => {
        localStorage.setItem("currUser", JSON.stringify(currUser))
    }

    const logout = () => {
        console.log("logged out")
        localStorage.removeItem("currUser")
        localStorage.removeItem("token")
    }

    return {getCurrUser, setCurrUser, getToken, setToken, logout}
}


export {
    getLatLng,
    createQueryParams,
    makeFilter,
    useLocalStorage
}
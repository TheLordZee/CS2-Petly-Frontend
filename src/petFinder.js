import axios from "axios";
import {
    API_KEY,
    API_SECRET,
    PF_BASE_URL
} from "./config";

const parameters = [
    "type", "breed", "size", "gender", "age", "color", "coat", "status", "name", "organization", "good_with_children", "good_with_dogs", "good_with_cats", "house_trained", "declawed", "special_needs", "location"
]

const createQueryParams = (filter) =>{
    let res = ""
    for(let key of Object.keys(filter)){
        if(parameters.includes(key)){
            res += `$${key}=${filter[key]}`   
        }
    }

    return res;
}

/** External PetFinder API class
 * 
 * Static class tying together methods used to get/send to to the external PetFinder API.
 * 
 */

class PetFinderApi {
    static token = localStorage.getItem("pfToken");

    static async getToken(){
        const res = await axios.post(PF_BASE_URL + "oauth2/token", {
            grant_type: "client_credentials",
            client_id: API_KEY,
            client_secret: API_SECRET
        })
        
        const token = res.data.access_token;
        localStorage.setItem("pfToken", token)
        return token;
    }

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
    
        if(!PetFinderApi.token){
            await PetFinderApi.getToken();
        }
        const url = `${PF_BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${PetFinderApi.token}` };
        const params = (method === "get") ? data : {};
        try {
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
          console.error("API Error:", err);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
    }

    static async getAnimals(filter={}, page=1){
        const params = createQueryParams(filter)
        const res = await PetFinderApi.request(`animals?page=${page}${params}`)
        
        const animals = [...res.animals]
        console.log(animals)
        return animals;
    }

    static async getAnimal(id){
        const res = await PetFinderApi.request(`animals/${id}`);
        return res.animal;
    }
}

export default PetFinderApi;
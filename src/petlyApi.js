import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** Backend API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 */

class PetlyApi{
    // the token for interactive with the API will be stored here.
    static token = localStorage.getItem("userToken");

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
    
        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${PetlyApi.token}` };
        const params = (method === "get") ? data : {};
        try {
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
          console.error("API Error:", err);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes


    /*********************************************** User functions */

    /** Registers a user and stores the token on the PetlyApi class and then returns that token*/
    static async register(userData){
      let res = await this.request('auth/register', userData, 'post');
      PetlyApi.token = res.token;
      return res.token;
    }

    /** Logs a user in and stores the token on the PetlyApi class and then returns that token*/
    static async authenticate(userData){
        console.log(userData)
        let res = await this.request('auth/authenticate', userData, 'post');
        PetlyApi.token = res.token;
        return res.token;
    }

    /**  Gets and returns a user based on their username. */
    static async getUser(username){
        let res = await this.request(`users/${username}`);
        return res.user;
    }   

    /** Takes an object and username and then updates that user with the data */
    static async updateUser(username, data){
        let res = await this.request(`users/${username}`, data, 'patch')
        return res.user;
    }

    /*********************************************** Pet functions */

     /** Gets all pets */
    static async getPets(filter={}) {
        let res = await this.request(`pets`, filter);
        return res.companies;
    }

    /** Gets details on a pet by pet id */
    static async getPet(id){
        let res = await this.request(`pets/${id}`)
        return res.pet;
    }

    /** Upload a pet */
    static async createPet(petData){
        let res = await this.request('pets', petData, 'post')
        return res.pet;
    }

    /** Takes an object and pet id and then updates that pet with the data */
    static async updatePet( petId, data){
        let res = await this.request(`pets/${petId}`, data, 'patch')
        return res.pet;
    }
}



export default PetlyApi;
    
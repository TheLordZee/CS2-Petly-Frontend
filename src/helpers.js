import axios from 'axios';
import { GOOGLE_KEY } from './config';

async function getLatLng(address) {
    const {address1, address2, city, country, postcode, state} = address;
    const addressLine = (typeof(address1) === 'string') ? address1.replaceAll(" ", "+") : "";
    const cityLine = city.replaceAll(" ", "+")
    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressLine}+${cityLine}+${state}&key=${GOOGLE_KEY}`)
    const latLng  = res.data.results[0].geometry.location
    console.log();
    const latLngStr = JSON.stringify(latLng)
    localStorage.setItem('latLng', latLngStr)
}

export {
    getLatLng
}
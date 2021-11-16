import GoogleMapReact from 'google-map-react';
import marker from '../imgs/location-dot-solid.svg'
import "./Map.css"

const Marker = () => <div><img className="Map-marker" src={marker}/></div>;

const Map = ({latLng}) => {
    return(
        <>
            {(latLng.lat) ?  <div style={{ height: '50vh', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyD2-I9hSiIzfzM7rcq36JediDgCs-hYFGg" }}
                center={latLng}
                defaultZoom={11}
              >
                <Marker
                  lat={latLng.lat}
                  lng={latLng.lng}
                />
              </GoogleMapReact>
            </div> : ""}
            
        </>
    )
}

export default Map;
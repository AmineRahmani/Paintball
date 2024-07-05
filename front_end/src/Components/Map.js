import React from 'react';
import GoogleMapReact from 'google-map-react';

const ISIMGMarker = ({ text }) => (
    <div style={{
        color: 'white',
        background: 'red',
        padding: '0px 10px',
        borderRadius: '50px',
        textAlign: 'center'
    }}>
        {text}
    </div>
);

const MapComponent = () => { 
    const defaultProps = {
        center: {
            lat: 33.884,
            lng: 10.098
        },
        zoom: 10
    };

    return (
        <div 
         style={{ 
            height: '290px', 
            width: '620px', 
            marginTop: '-295px', 
            marginBottom:'10px',
            marginLeft: '640px', 
      
            border: '4px solid black', /* Ajout de la bordure */
            borderRadius:'6px'
            }}>
            <GoogleMapReact 
                bootstrapURLKeys={{ key: 'AIzaSyDOMgDxM0fmgb22UAVhWpRwpuVUufFKf_g' }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                center={defaultProps.center}
            >
                <ISIMGMarker
                    lat={33.884}
                    lng={10.098}
                    text="Brandy Paintball"
                />
            </GoogleMapReact>
        </div>
    );
}

export default MapComponent;

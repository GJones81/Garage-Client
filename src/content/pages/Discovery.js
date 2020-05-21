import React from 'react';
import GoogleMapReact from 'google-map-react';

const Discovery = props => {

    let center = {
        lat: 59.95,
        lng: 30.33
    }
    let zoom =  11

    return (
        <div id="map" style={{ height: '500px', width: '500px' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCNsWfTlAvW9QV0iOf_3SgvmO-nG4nMiww'}}
                defaultCenter={center}
                defaultZoom={zoom}
        >
          <p>
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
        </p>
        </GoogleMapReact>
      </div>

    )
}

export default Discovery
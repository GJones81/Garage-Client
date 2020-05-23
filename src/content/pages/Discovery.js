import React from 'react';
import GoogleMapReact from 'google-map-react';

const Discovery = props => {

  console.log(props.discoveries)
  let discovery = props.discoveries.publicSales.map((d, i) =>{
    return (
      <div key={i}>
        <p>Address: {d.address}</p>
        <p>Date: {d.date}</p>
      </div>
    )
  })

    let center = {
        lat: 59.95,
        lng: 30.33
    }
    let zoom =  11

    return (
        <div id="map" style={{ height: '500px', width: '500px' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk'}}
                defaultCenter={center}
                defaultZoom={zoom}
        >
          <p>
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
        </p>
        </GoogleMapReact>

        <div>
          { discovery }
        </div>
      </div>
       
      

    )
}

export default Discovery
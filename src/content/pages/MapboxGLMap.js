import React, {useState} from 'react';
import ReactMapGL, { Marker, GeoLocateControl } from 'react-map-gl'

const MapboxGLMap = props => {

    // let [userLocation, setUserLocation ] =useState('')
    // let [originalLocation, setOriginalLocation ] = useState('')
    
   
        const [ viewport, setViewport ] = useState({
            width: "100%",
            height: "400px",
            latitude: 47.6062,
            longitude: -122.3321,
            zoom: 12
          })
        
        // const _onViewportChange = viewport => setViewport({...viewport, transitionDuration: 3000 })


return (
    <div>
        <h1 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>
            GeoLocator: Click To Find Your Location or click 
            <a href="/search">here</a> to search for a location</h1>
        {/* <ReactMapGL 
            {...viewport}
            mapboxApiAccessToken='pk.eyJ1Ijoic2p5OTUiLCJhIjoiY2thbGw4dnd4MTJ6czJycDR1aWU5ajd0dCJ9.EbJoQtqZr47OEbEKLgJCEw'
                mapStyle="mapbox://styles/sjy95/ckalztmwd2f8f1in0m2cvvp2k"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
            >
            
        </ReactMapGL> */}
    </div>
)

}

export default MapboxGLMap
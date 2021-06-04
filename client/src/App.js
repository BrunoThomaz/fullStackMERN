import React, { useState, useEffect } from 'react';

import ReactMapGL, { Marker, NavigationControl, Popup, GeolocateControl } from 'react-map-gl';

import { listLogEntries } from './API';

import LocationForm  from './Components/addLocationForm/addLocationForm';
import MenuBar from './Components/menuBar/menuBar';


const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({greetings:true});

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: -3.7537540999999996,
    longitude: -38.505748499999996,
    zoom: 2,
    zIndex: 1
  });

  const [addEntryLocation, setAddEntryLocation] = useState(null);

  const showAddMarkerPopup = (event) => {
    if (event.lngLat) { //If it's a double click event
      const [longitude, latitude] = event.lngLat;
      setAddEntryLocation({
        latitude,
        longitude
      })
    } else if (event.coords) { //If it's a geolocate event
      setAddEntryLocation({latitude: event.coords.latitude, longitude: event.coords.longitude})
    }
    
  }
  const getEntries = async (operadora="all") => {
    const logEntries = await listLogEntries(operadora);
    if (logEntries.message) {
      return console.log(logEntries.message);
    }
    console.log(logEntries);
    setLogEntries(logEntries);
  }

  useEffect(() => {
    getEntries();
  }, []);

  const geolocateControlStyle = {
    right: 10,
    top: 10
  }

  const styleNavigation = {
    left: 10,
    bottom: 40
  }
  

  return (
    <div
    className="mainApp"
    >
      <MenuBar getEntries={getEntries}/>
      <ReactMapGL
        {...viewport}
        onViewportChange = {setViewport}
        mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        doubleClickZoom = {false}
        onDblClick={showAddMarkerPopup}
        >
        {
          showPopup["greetings"] ? (
            <Popup  
              latitude = {viewport.latitude} 
              longitude = {viewport.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup(false)}
              anchor="top" 
              className="popUp"
              >
              <p>Vamos fazer um mapa da internet na Cabotagem brasileira!</p>
              <p>Para contribuir, dê um duplo clique na sua localização e preencha o formulário.</p>
            </Popup>
          ) : null
        }

        
        {

          logEntries.map(entry => (
            <React.Fragment key={entry._id}>
              <Marker 
                key={entry._id}
                latitude = {entry.latitude} 
                longitude = {entry.longitude} 
                offsetLeft = {-20} 
                offsetTop = {-10}
              >
                <svg
                viewBox="0 0 365 560" 
                enableBackground="new 0 0 365 560"
                width="24"
                height="24"
                className="marker"
                onClick={()=>
                  setShowPopup({
                    [entry._id]:true
                  })
                }
                >
                  <g>
                    <path d="M182.9,551.7c0,0.1,0.2,0.3,0.2,0.3S358.3,283,358.3,194.6c0-130.1-88.8-186.7-175.4-186.9   C96.3,7.9,7.5,64.5,7.5,194.6c0,88.4,175.3,357.4,175.3,357.4S182.9,551.7,182.9,551.7z M122.2,187.2c0-33.6,27.2-60.8,60.8-60.8   c33.6,0,60.8,27.2,60.8,60.8S216.5,248,182.9,248C149.4,248,122.2,220.8,122.2,187.2z"/>
                  </g>
                </svg>
              </Marker>
              {
                showPopup[entry._id] ? (

                <Popup
                  latitude = {entry.latitude} 
                  longitude = {entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setShowPopup(false)}
                  anchor="top" 
                  className="popUp"
                  >
                  <h3>{entry.operadora}</h3>
                  <p>{entry.nivel}</p>
                </Popup>
                ) : null
              }
            </React.Fragment>
            ))
        }

        {
          addEntryLocation ? (
          <React.Fragment >
              <Marker 
                latitude = {addEntryLocation.latitude} 
                longitude = {addEntryLocation.longitude} 
                offsetLeft = {-20} 
                offsetTop = {-10}
              >
                <svg
                viewBox="0 0 365 460" 
                enableBackground="new 0 0 365 460"
                width="24"
                height="24"
                className="addLog"
                >
                  <g>
                    <path d="M182.9,551.7c0,0.1,0.2,0.3,0.2,0.3S358.3,283,358.3,194.6c0-130.1-88.8-186.7-175.4-186.9   C96.3,7.9,7.5,64.5,7.5,194.6c0,88.4,175.3,357.4,175.3,357.4S182.9,551.7,182.9,551.7z M122.2,187.2c0-33.6,27.2-60.8,60.8-60.8   c33.6,0,60.8,27.2,60.8,60.8S216.5,248,182.9,248C149.4,248,122.2,220.8,122.2,187.2z"/>
                  </g>
                </svg>
              </Marker>
              {
                <Popup
                  latitude = {addEntryLocation.latitude} 
                  longitude = {addEntryLocation.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setAddEntryLocation(null)}
                  anchor="top" 
                  className="popUp"
                  >
                  <LocationForm onClose={() => {
                    setAddEntryLocation(null);
                    getEntries();
                  }} location={addEntryLocation}/>
                </Popup>
              }
            </React.Fragment>
        ) 
        : null
        }
        {
          <NavigationControl
            style = {styleNavigation}
          />
        }  
        {
          <GeolocateControl
            style={geolocateControlStyle}
            positionOptions={{enableHighAccuracy: true}}
            trackUserLocation={false}
            onGeolocate = {showAddMarkerPopup}
            className="locationButton"
          />
        }
      </ReactMapGL>

    </div>

  )
}




export default App;

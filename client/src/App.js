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
    zoom: 2
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
  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
    console.log('starting getEntries');
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
      <MenuBar/>
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
                width="24"
                height="24"
                onClick={()=>
                  setShowPopup({
                    [entry._id]:true
                  })
                }
                >
                  <path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/>
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
                  <p>{entry.description}</p>
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
                width="24"
                height="24"
                >
                  <path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/>
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
          />
        }
      </ReactMapGL>

    </div>

  )
}




export default App;

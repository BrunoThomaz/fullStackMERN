import React, { useState, useEffect } from 'react';

import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API';





const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: -3.7537540999999996,
    longitude: -38.505748499999996,
    zoom: 2
  });

  useEffect(() => {
    (async ()=>{
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
    {...viewport}
    onViewportChange = {setViewport}
    mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    doubleClickZoom = {false}
    >
    {

      logEntries.map(entry => (
        <>
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
              anchor="top" >
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
            </Popup>
            ) : null
          }
        </>
        ))

    }
    </ReactMapGL>

  )
}




export default App;

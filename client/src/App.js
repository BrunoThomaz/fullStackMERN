import React, { useState } from 'react';

import ReactMapGL from 'react-map-gl';





const App = () => {

  const [viewport, setViewport] = useState({
    width: '100%',
    heigth: '100%',
    latitude: -3.7537540999999996,
    longitude: -38.505748499999996,
    zoom: 2
  });

  return (
    <ReactMapGL
    {...viewport}
    onViewportChange = {setViewport}
    />
  )
}




export default App;

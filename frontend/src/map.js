import React, { useState } from 'react';
import mapImage from './Map_photo.png';

function Map() {
  const buttonNames = [
    'BANNOCKBURN',
    'DUNDEE',
    'FALKIRK',
    'GLEN MOR',
    'LOTHIAN',
    'NORTH DISTRICT',
    'PENTLAND HILLS',
    'PLAZA',
    'OBAN',
    'STONEHAVEN',
  ];

  const [clickedButton, setClickedButton] = useState(null);
  const [isBannerOpen, setIsBannerOpen] = useState(false);

  const overlayStyles = {
    'BANNOCKBURN': { top: '62%', left: '23.2%', width: '10%', height: '8%' },
    'DUNDEE': { top: '53%', left: '56.9%', width: '3.2%', height: '8%' },
    'FALKIRK': { top: '38%', left: '25.4%', width: '8%', height: '13%' },
    'GLEN MOR': { top: '58%', left: '70%', width: '10%', height: '25%' },
    'LOTHIAN': { top: '74.8%', left: '62%', width: '8%', height: '10.2%' },
    'NORTH DISTRICT': { top: '41%', left: '45%', width: '10%', height: '10%' },
    'PENTLAND HILLS': { top: '57.9%', left: '61.3%', width: '9.5%', height: '14%' },
    'PLAZA': { top: '52%', left: '22.5%', width: '3.5%', height: '14%' },
    'OBAN': { top: '52%', left: '26%', width: '8%', height: '9%' },
    'STONEHAVEN': { top: '10%', left: '27.8%', width: '6%', height: '12.5%' }
    // Define the rest accordingly
  };

  const renderOverlay = (name) => {
    if (!overlayStyles[name]) return null;

    const style = {
      position: 'absolute',
      ...overlayStyles[name],
      backgroundColor: 'rgba(255, 0, 0, 0.5)',
      pointerEvents: 'none',
    };

    return <div style={style}></div>;
  };

  return (
    <div style={{ position: 'relative', maxWidth: '100%' }}>
      <h1>Map Page</h1>
      <img src={mapImage} alt="R'Insight Map" className="mapImage" style={{ width: '75%', height: 'auto', maxHeight: '75%', display: 'block'}} />

      {buttonNames.map((name, index) => (
        <button
          key={index}
          style={{
            position: 'absolute',
            top: `${186 + index * 40}px`, // This will need adjustment or a dynamic calculation for smaller screens
            left: '0px',
            backgroundColor: 'white',
            color: 'darkblue',
            width: '130px',
            height: '40px',
            fontSize: '15px',
            fontWeight: 'bold',
          }}
          onClick={() => {
            setClickedButton(name);
            setIsBannerOpen(true);
          }}
        >
          {name}
        </button>
      ))}

      {clickedButton && isBannerOpen && (
        <div style={{ backgroundColor: '#B8860B', marginTop: '576px', position: 'absolute', top: '10px', left: '0px', height: '20%'}}>
          <div style={{ float: 'right', cursor: 'pointer' }} onClick={() => setIsBannerOpen(false)}></div>
          Ratings for {clickedButton}: X
        </div>
      )}

      {clickedButton && renderOverlay(clickedButton)}
    </div>
  );
}

export default Map;

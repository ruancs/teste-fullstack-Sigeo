"use client";

import React, { useEffect, useRef, useState } from 'react';

const MapComponent = () => {
  const mapRef = useRef(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {

    const loadArcGIS = () => {

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://js.arcgis.com/4.30/esri/themes/light/main.css';
      document.head.appendChild(link);
      
      const script = document.createElement('script');
      script.src = 'https://js.arcgis.com/4.30/';
      script.async = true;
      script.onload = () => {

        const mapComponentScript = document.createElement('script');
        mapComponentScript.type = 'module';
        mapComponentScript.src = 'https://js.arcgis.com/map-components/4.30/arcgis-map-components.esm.js';
        mapComponentScript.onload = initMap; // Inicia o mapa após o carregamento
        document.body.appendChild(mapComponentScript);
      };
      document.body.appendChild(script);
    };


    const fetchLocations = async () => {
      const response = await fetch('app/api/locations');
      const data = await response.json();
      setLocations(data);
    };

    const initMap = () => {
      const mapComponent = document.createElement('arcgis-map');
      mapComponent.setAttribute('item-id', '05e015c5f0314db9a487a9b46cb37eca'); // Substitua pelo seu item ID
      
      const legend = document.createElement('arcgis-legend');
      legend.setAttribute('position', 'bottom-right');
      mapComponent.appendChild(legend);


      mapRef.current.appendChild(mapComponent);

      locations.forEach((location) => {
        const point = {
          type: 'point',
          x: location.geometry.x,
          y: location.geometry.y,
          spatialReference: { wkid: 31983 }
        };

        const graphic = document.createElement('arcgis-graphic');
        graphic.setAttribute('geometry', JSON.stringify(point));
        graphic.setAttribute('title', location.tx_nome);
        graphic.setAttribute('description', `Bairro: ${location.tx_bairro}`);
        mapComponent.appendChild(graphic);
      });
    };
    fetchLocations();
    loadArcGIS();

    return () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
      }
    };
  }, [locations]);

  return (
    <div>
      <h1>Mapa de Localidades de salva vidas de Niterói</h1>
      <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};

export default MapComponent;

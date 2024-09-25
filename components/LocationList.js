"use client";

import React, { useEffect, useState } from 'react';

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/locations');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Localizações</h1>
      <ul>
        {locations.map(location => (
          <li key={location.OBJECTID}>
            <strong>Nome:</strong> {location.tx_nome} <br />
            <strong>Bairro:</strong> {location.tx_bairro} <br />
            <strong>Coordenadas:</strong> ({location.geometry.x}, {location.geometry.y})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;

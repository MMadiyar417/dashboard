import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PlanetDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [planet, setPlanet] = useState<any>(null);

  useEffect(() => {
    const fetchPlanetDetails = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/planets/${id}/`); 
        const data = await response.json();
        setPlanet(data);
      } catch (error) {
        console.error('Error fetching planet details:', error);
      }
    };

    fetchPlanetDetails();
  }, [id]);

  if (!planet) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="p-4 border rounded bg-light">
        <h2 className="mb-4">{planet.name}</h2>
        <p><strong>Diameter:</strong> {planet.diameter}</p>
        <p><strong>Climate:</strong> {planet.climate}</p>
        <p><strong>Gravity:</strong> {planet.gravity}</p>
        <p><strong>Population:</strong> {planet.population}</p>
      </div>
    </div>
  );
};

export default PlanetDetails;

import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const StarshipDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [starship, setStarship] = useState<any>(null);

  useEffect(() => {
    const fetchStarshipDetails = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/starships/${id}/`); 
        const data = await response.json();
        setStarship(data);
      } catch (error) {
        console.error('Error fetching starship details:', error);
      }
    };

    fetchStarshipDetails();
  }, [id]);

  if (!starship) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="p-4 border rounded bg-light">
        <h2 className="mb-4">{starship.name}</h2>
        <p><strong>Model:</strong> {starship.model}</p>
        <p><strong>Length:</strong> {starship.length}</p>
        <p><strong>Passengers:</strong> {starship.passengers}</p>
        <p><strong>Starship Class:</strong> {starship.starship_class}</p>
      </div>
    </div>
  );
};

export default StarshipDetails;

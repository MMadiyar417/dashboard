import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PeopleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<any>(null);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`); 
        const data = await response.json();
        setPerson(data);
      } catch (error) {
        console.error('Error fetching person details:', error);
      }
    };

    fetchPersonDetails();
  }, [id]);

  if (!person) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="p-4 border rounded bg-light">
        <h2 className="mb-4">{person.name}</h2>
        <p><strong>Height:</strong> {person.height}</p>
        <p><strong>Mass:</strong> {person.mass}</p>
        <p><strong>Gender:</strong> {person.gender}</p>
        <p><strong>Birth Year:</strong> {person.birth_year}</p>
      </div>
    </div>
  );
};

export default PeopleDetails;

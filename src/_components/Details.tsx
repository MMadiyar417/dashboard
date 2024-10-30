import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
import EditEntityForm from './Edit';
import 'bootstrap/dist/css/bootstrap.min.css';

const EntityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [entity, setEntity] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchEntityDetails = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`); 
        const data = await response.json();
        setEntity(data);
      } catch (error) {
        console.error('Error fetching entity details:', error);
      }
    };

    fetchEntityDetails();
  }, [id]);

  const handleEditSubmit = (data: any) => {
    console.log('Updated Data:', data); 
    setEntity({ ...entity, ...data });
    setIsEditing(false);
  };

  if (!entity) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="p-4 border rounded bg-light">
        <h2 className="mb-4">{entity.name}</h2>
        {!isEditing ? (
          <>
            <p><strong>Height:</strong> {entity.height}</p>
            <p><strong>Mass:</strong> {entity.mass}</p>
            <button 
              onClick={() => setIsEditing(true)} 
              className="btn btn-secondary"
            >
              Edit
            </button>
          </>
        ) : (
          <EditEntityForm entity={entity} onSubmit={handleEditSubmit} />
        )}
      </div>
    </div>
  );
};

export default EntityDetail;

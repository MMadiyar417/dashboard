import React, { useState } from 'react';
import EntityTable from '../_components/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home: React.FC = () => {
  const [endpoint, setEndpoint] = useState<string>('people');

  const handleButtonClick = (newEndpoint: string) => {
    setEndpoint(newEndpoint);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Home Page</h2>
      
      <div className="mb-4">
        <button
          className="btn btn-primary me-2"
          onClick={() => handleButtonClick('people')}
          disabled={endpoint === 'people'}
        >
          Персонажи
        </button>

        <button
          className="btn btn-primary me-2"
          onClick={() => handleButtonClick('planets')}
          disabled={endpoint === 'planets'} 
        >
          Планеты
        </button>

        <button
          className="btn btn-primary"
          onClick={() => handleButtonClick('starships')}
          disabled={endpoint === 'starships'} 
        >
          Космические корабли
        </button>
      </div>

      <EntityTable endpoint={endpoint} />
    </div>
  );
};

export default Home;

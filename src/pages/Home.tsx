import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home: React.FC = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Home Page</h2>
      
      <div className="mb-4">
        <Link to="/people" className="btn btn-primary me-2">
          Персонажи
        </Link>

        <Link to="/planets" className="btn btn-primary me-2">
          Планеты
        </Link>

        <Link to="/starships" className="btn btn-primary">
          Космические корабли
        </Link>
      </div>

    </div>
  );
};

export default Home;

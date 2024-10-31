import React from 'react';
import EntityTable from '../_components/Table';
import { Link } from 'react-router-dom';

const PlanetsList: React.FC = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Список Планет</h2>
      <EntityTable endpoint="planets" />
      <Link to="/home" className="btn btn-primary mt-3">На главную</Link>
    </div>
  );
};

export default PlanetsList;

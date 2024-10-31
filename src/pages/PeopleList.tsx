import React from 'react';
import EntityTable from '../_components/Table';
import { Link } from 'react-router-dom';

const PeopleList: React.FC = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Список Персонажей</h2>
      <EntityTable endpoint="people" />
      <Link to="/home" className="btn btn-primary mt-3">На главную</Link>
    </div>
  );
};

export default PeopleList;

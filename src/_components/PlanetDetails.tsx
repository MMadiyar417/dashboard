import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlanets } from '../features/planetSlice';
import { RootState, AppDispatch } from '../store/store';
import 'bootstrap/dist/css/bootstrap.min.css';

const PlanetDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const planet = useSelector((state: RootState) =>
    id ? state.planets.entities.find((planet) => planet?.id?.toString() === id) : undefined
  );

  useEffect(() => {
    if (!planet) {
      dispatch(fetchPlanets());
    }
  }, [dispatch, planet]);

  if (!id) {
    return <p className="text-center">Идентификатор планеты не указан.</p>;
  }

  if (!planet) {
    return <p className="text-center">Планета не найдена.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{planet.name}</h2>
      <p><strong>Climate:</strong> {planet.climate}</p>
      <p><strong>Diameter:</strong> {planet.diameter}</p>
      <p><strong>Population:</strong> {planet.terrain}</p>
      <button className="btn btn-primary" onClick={() => navigate(`/planets/edit/${id}`)}>
        Редактировать
      </button>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Назад
      </button>
    </div>
  );
};

export default PlanetDetails;

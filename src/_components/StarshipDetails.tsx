import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStarships } from '../features/starshipSlice';
import { RootState, AppDispatch } from '../store/store';
import 'bootstrap/dist/css/bootstrap.min.css';

const StarshipDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const starship = useSelector((state: RootState) =>
    id ? state.starships.entities.find((starship) => starship.id.toString() === id) : undefined
  );

  useEffect(() => {
    if (!starship) {
      dispatch(fetchStarships());
    }
  }, [dispatch, starship]);

  if (!id) return <p className="text-center">Идентификатор звездолета не указан.</p>;
  if (!starship) return <p className="text-center">Звездолет не найден.</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{starship.name}</h2>
      <p><strong>Модель:</strong> {starship.model}</p>
      <p><strong>Производитель:</strong> {starship.manufacturer}</p>
      <p><strong>Длина:</strong> {starship.length}</p>
      <button className="btn btn-primary" onClick={() => navigate(`/starships/edit/${id}`)}>
        Редактировать
      </button>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Назад
      </button>
    </div>
  );
};

export default StarshipDetails;

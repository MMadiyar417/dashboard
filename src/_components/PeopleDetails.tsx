import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPeople } from '../features/peopleSlice';
import { RootState, AppDispatch } from '../store/store';
import 'bootstrap/dist/css/bootstrap.min.css';

const PeopleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const entity = useSelector((state: RootState) =>
    state.people.entities.find((entity) => entity.id.toString() === id)
  );

  useEffect(() => {
    dispatch(fetchPeople());
  }, [dispatch]);

  useEffect(() => {
    console.log('Полученные данные для отображения:', entity); 
  }, [entity]);

  if (!entity) {
    return <p className="text-center">Загружаем данные...</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{entity.name}</h2>
      <p><strong>Height:</strong> {entity.height}</p>
      <p><strong>Mass:</strong> {entity.mass}</p>
      <p><strong>Gender:</strong> {entity.gender}</p>
      <p><strong>Birth Year:</strong> {entity.birth_year}</p>
      <button className="btn btn-primary" onClick={() => navigate(`/people/edit/${id}`)}>
        Редактировать
      </button>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Назад
      </button>
    </div>
  );
};

export default PeopleDetails;

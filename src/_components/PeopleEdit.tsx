import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPeople } from '../features/peopleSlice';
import { RootState, AppDispatch } from '../store/store';
import { useForm } from 'react-hook-form';
import { updatePeople } from '../features/editSlice';

const PeopleEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  const entity = useSelector((state: RootState) =>
    state.people.entities.find((entity) => entity.id.toString() === id)
  );

  useEffect(() => {
    if (!entity) {
      dispatch(fetchPeople());
    } else {
      setValue('name', entity.name);
      setValue('height', entity.height);
      setValue('mass', entity.mass);
    }
  }, [entity, dispatch, setValue]);

  const onSubmit = (data: any) => {
    console.log('Данные перед отправкой:', data);
    dispatch(updatePeople({ id: Number(id), data }));
    navigate(`/people/${id}`);
  };

  if (!entity) {
    return <p className="text-center">Загружаем данные...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-4">
      <h2 className="mb-4">Редактировать: {entity.name}</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Имя</label>
        <input type="text" className="form-control" id="name" {...register('name')} />
      </div>
      <div className="mb-3">
        <label htmlFor="height" className="form-label">Рост</label>
        <input type="number" className="form-control" id="height" {...register('height')} />
      </div>
      <div className="mb-3">
        <label htmlFor="mass" className="form-label">Вес</label>
        <input type="number" className="form-control" id="mass" {...register('mass')} />
      </div>
      <button type="submit" className="btn btn-primary">Сохранить</button>
    </form>
  );
};

export default PeopleEdit;

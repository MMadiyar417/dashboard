import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchPlanets } from '../features/planetSlice';
import { RootState, AppDispatch } from '../store/store';
import { updatePlanets } from '../features/editSlice'; 
import 'bootstrap/dist/css/bootstrap.min.css';

type PlanetFormData = {
  name: string;
  diameter: string; 
  climate: string;
  terrain: string;
};

const PlanetEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<PlanetFormData>();

  const planet = useSelector((state: RootState) =>
    id ? state.planets.entities.find((planet) => planet.id.toString() === id) : undefined
  );

  useEffect(() => {
    if (!planet) {
      dispatch(fetchPlanets());
    } else {
      setValue('name', planet.name);
      setValue('diameter', planet.diameter.toString()); 
      setValue('climate', planet.climate);
      setValue('terrain', planet.terrain);
    }
  }, [planet, dispatch, setValue]);

  const onSubmit = (data: PlanetFormData) => {
    if (id) {
      const updatedData = {
        ...data,
        diameter: parseFloat(data.diameter), 
      };
      dispatch(updatePlanets({ id: Number(id), data: updatedData }));
      navigate(`/planets/${id}`);
    }
  };

  if (!id) {
    return <p className="text-center">Идентификатор планеты не указан.</p>;
  }

  if (!planet) {
    return <p className="text-center">Планета не найдена.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded bg-light">
      <h2 className="mb-4">Редактировать {planet.name}</h2>
      <div className="mb-3">
        <label className="form-label">Климат</label>
        <input type="text" {...register('climate', { required: true })} defaultValue={planet.climate} className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Диаметр</label>
        <input
          type="text"
          {...register('diameter', { required: true })}
          defaultValue={planet.diameter.toString()} 
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Территория</label>
        <input type="text" {...register('terrain', { required: true })} defaultValue={planet.terrain} className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary mt-3">Сохранить изменения</button>
    </form>
  );
};

export default PlanetEdit;

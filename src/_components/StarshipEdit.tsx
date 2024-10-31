import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/store'; 
import { updateStarship } from '../features/starshipSlice'; 

const StarshipEdit: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const starship = useSelector((state: RootState) =>
    state.starships.entities.find((s) => s.id === Number(id))
  );

  console.log('Starship ID:', id);
  console.log('Starship:', starship);

  const { register, handleSubmit, setValue } = useForm();

  React.useEffect(() => {
    if (starship) {
      setValue('name', starship.name);
      setValue('model', starship.model);
      setValue('manufacturer', starship.manufacturer);
      setValue('length', starship.length);
    }
  }, [starship, setValue]);

  const onSubmit = (data: any) => {
    dispatch(updateStarship({ id: Number(id), ...data })).then(() => {
      navigate(-1); 
    });
  };

  if (!starship) return <div>Звездолет не найден</div>;

  return (
    <div className="container mt-5">
      <h2>Редактировать Звездолет</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Название</label>
          <input className="form-control" {...register('name')} />
        </div>
        <div className="mb-3">
          <label className="form-label">Модель</label>
          <input className="form-control" {...register('model')} />
        </div>
        <div className="mb-3">
          <label className="form-label">Производитель</label>
          <input className="form-control" {...register('manufacturer')} />
        </div>
        <div className="mb-3">
          <label className="form-label">Длина</label>
          <input className="form-control" {...register('length')} />
        </div>
        <button type="submit" className="btn btn-primary">Сохранить изменения</button>
      </form>
    </div>
  );
};

export default StarshipEdit;

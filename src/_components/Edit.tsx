import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface EditEntityFormProps {
  entity: any; 
  onSubmit: (data: any) => void; 
}

const schema = yup.object({
  name: yup.string().required('Name is required'),
  height: yup.number().positive().integer().required('Height is required'),
  mass: yup.number().required('Mass is required'),
}).required();

const EditEntityForm: React.FC<EditEntityFormProps> = ({ entity, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: entity,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-3 border rounded">
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input {...register('name')} className="form-control" />
        {errors.name && (
          <p className="text-danger">{typeof errors.name.message === 'string' ? errors.name.message : 'Error'}</p>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Height</label>
        <input type="number" {...register('height')} className="form-control" />
        {errors.height && (
          <p className="text-danger">{typeof errors.height.message === 'string' ? errors.height.message : 'Error'}</p>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Mass</label>
        <input type="number" {...register('mass')} className="form-control" />
        {errors.mass && (
          <p className="text-danger">{typeof errors.mass.message === 'string' ? errors.mass.message : 'Error'}</p>
        )}
      </div>
      <button type="submit" className="btn btn-primary">Save Changes</button>
    </form>
  );
};

export default EditEntityForm;

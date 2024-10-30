import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 

type LoginFormInputs = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const onSubmit = (data: LoginFormInputs) => {
    if (data.username === '1' && data.password === '1') {
      dispatch(login(data.username));
      navigate('/home');
    } else {
      alert('Invalid email or password');
    }
  };

  if (isAuthenticated) {
    navigate('/home');
  }

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-light p-4 rounded">
        <h2 className="mb-4">Login</h2>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            {...register('username', { required: true })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            {...register('password', { required: true })}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;

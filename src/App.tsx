import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Home from './pages/Home';
import PeopleDetails from './_components/PeopleDetails';
import PlanetDetails from './_components/PlanetDetails';
import StarshipDetails from './_components/StarshipDetails';
import { RootState } from './store';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/people/:id"
        element={isAuthenticated ? <PeopleDetails /> : <Navigate to="/login" />}
      />
      <Route
        path="/planets/:id"
        element={isAuthenticated ? <PlanetDetails /> : <Navigate to="/login" />}
      />
      <Route
        path="/starships/:id"
        element={isAuthenticated ? <StarshipDetails /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;

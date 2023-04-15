import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './route';
import Layout from './components/Layout';
import './styles/global.module.css';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

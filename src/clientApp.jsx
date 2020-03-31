import React from 'react';
import { object, array } from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import App from '#containers/app/App';

// Compose Client App
const ClientApp = ({ initialData, routes }) => (
  <BrowserRouter>
    <App initialData={initialData} routes={routes} />
  </BrowserRouter>
);

ClientApp.propTypes = {
  initialData: object.isRequired,
  routes: array.isRequired,
};

export default ClientApp;

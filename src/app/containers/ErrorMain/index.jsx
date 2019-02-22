import React from 'react';
import { number } from 'prop-types';
import { ServiceContextConsumer } from '../../contexts/ServiceContext';
import ErrorPageComponent from '../../components/ErrorPage';

const ErrorMain = ({ status }) => (
  <ServiceContextConsumer>
    {({ translations }) => {
      const messaging = translations.error[status] || translations.error[500];

      return <ErrorPageComponent {...messaging} />;
    }}
  </ServiceContextConsumer>
);

ErrorMain.propTypes = {
  status: number.isRequired,
};

export default ErrorMain;

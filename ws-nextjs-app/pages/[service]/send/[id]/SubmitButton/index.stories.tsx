import React from 'react';
import ThemeProvider from '#components/ThemeProvider';
import SubmitButtonComponent from '.';

const Component = () => (
  <ThemeProvider service="pidgin">
    <SubmitButtonComponent />
  </ThemeProvider>
);

export default {
  title: 'Components/FormFields',
  Component,
};

export const SubmitButton = () => <Component />;

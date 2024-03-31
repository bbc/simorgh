import React from 'react';
import ThemeProvider from '#app/components/ThemeProvider';
import SubmitButtonComponent from '.';

const Component = () => (
  <ThemeProvider service="pidgin">
    <SubmitButtonComponent />
  </ThemeProvider>
);

export default {
title: 'New Components/FormFields/SubmitButton',
  Component,
};

export const SubmitButton = () => <Component />;

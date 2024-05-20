import React from 'react';
import ThemeProvider from '#app/components/ThemeProvider';
import SuccessMessage from './index';

const Component = () => (
  <ThemeProvider service="pidgin">
    <SuccessMessage />
  </ThemeProvider>
);

export default {
  title: 'Components/SucessMessage',
  Component,
};

import React from 'react';
import { storiesOf } from '@storybook/react';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ErrorMain from '.';

storiesOf('Pages|Error Page', module)
  .add('404', () => (
    <ServiceContextProvider service="news">
      <ErrorMain status={404} />
    </ServiceContextProvider>
  ))
  .add('500', () => (
    <ServiceContextProvider service="news">
      <ErrorMain status={500} />
    </ServiceContextProvider>
  ))
  .add('404 - Persian', () => (
    <ServiceContextProvider service="persian">
      <ErrorMain status={404} />
    </ServiceContextProvider>
  ))
  .add('500 - Persian', () => (
    <ServiceContextProvider service="persian">
      <ErrorMain status={500} />
    </ServiceContextProvider>
  ))
  .add('404 - Igbo', () => (
    <ServiceContextProvider service="igbo">
      <ErrorMain status={404} />
    </ServiceContextProvider>
  ))
  .add('500 - Igbo', () => (
    <ServiceContextProvider service="igbo">
      <ErrorMain status={500} />
    </ServiceContextProvider>
  ))
  .add('404 - Pidgin', () => (
    <ServiceContextProvider service="pidgin">
      <ErrorMain status={404} />
    </ServiceContextProvider>
  ))
  .add('500 - Pidgin', () => (
    <ServiceContextProvider service="pidgin">
      <ErrorMain status={500} />
    </ServiceContextProvider>
  ))
  .add('404 - Yoruba', () => (
    <ServiceContextProvider service="yoruba">
      <ErrorMain status={404} />
    </ServiceContextProvider>
  ))
  .add('500 - Yoruba', () => (
    <ServiceContextProvider service="yoruba">
      <ErrorMain status={500} />
    </ServiceContextProvider>
  ));

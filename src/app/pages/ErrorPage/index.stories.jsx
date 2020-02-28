import React from 'react';
import { storiesOf } from '@storybook/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import ErrorPage from '.';

storiesOf('Pages|Error Page', module)
  .add('404', () => (
    <ServiceContextProvider service="news">
      <ErrorPage status={404} />
    </ServiceContextProvider>
  ))
  .add('500', () => (
    <ServiceContextProvider service="news">
      <ErrorPage status={500} />
    </ServiceContextProvider>
  ))
  .add('404 - Persian', () => (
    <ServiceContextProvider service="persian">
      <ErrorPage status={404} />
    </ServiceContextProvider>
  ))
  .add('500 - Persian', () => (
    <ServiceContextProvider service="persian">
      <ErrorPage status={500} />
    </ServiceContextProvider>
  ))
  .add('404 - Igbo', () => (
    <ServiceContextProvider service="igbo">
      <ErrorPage status={404} />
    </ServiceContextProvider>
  ))
  .add('500 - Igbo', () => (
    <ServiceContextProvider service="igbo">
      <ErrorPage status={500} />
    </ServiceContextProvider>
  ))
  .add('404 - Pidgin', () => (
    <ServiceContextProvider service="pidgin">
      <ErrorPage status={404} />
    </ServiceContextProvider>
  ))
  .add('500 - Pidgin', () => (
    <ServiceContextProvider service="pidgin">
      <ErrorPage status={500} />
    </ServiceContextProvider>
  ))
  .add('404 - Yoruba', () => (
    <ServiceContextProvider service="yoruba">
      <ErrorPage status={404} />
    </ServiceContextProvider>
  ))
  .add('500 - Yoruba', () => (
    <ServiceContextProvider service="yoruba">
      <ErrorPage status={500} />
    </ServiceContextProvider>
  ));

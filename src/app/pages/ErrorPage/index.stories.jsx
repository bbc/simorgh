import React from 'react';
import { storiesOf } from '@storybook/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import ErrorPage from '.';

storiesOf('Pages|Error Page', module)
  .add('404', () => (
    <ServiceContextProvider service="news">
      <ErrorPage errorCode={404} />
    </ServiceContextProvider>
  ))
  .add('500', () => (
    <ServiceContextProvider service="news">
      <ErrorPage errorCode={500} />
    </ServiceContextProvider>
  ))
  .add('404 - Persian', () => (
    <ServiceContextProvider service="persian">
      <ErrorPage errorCode={404} />
    </ServiceContextProvider>
  ))
  .add('500 - Persian', () => (
    <ServiceContextProvider service="persian">
      <ErrorPage errorCode={500} />
    </ServiceContextProvider>
  ))
  .add('404 - Igbo', () => (
    <ServiceContextProvider service="igbo">
      <ErrorPage errorCode={404} />
    </ServiceContextProvider>
  ))
  .add('500 - Igbo', () => (
    <ServiceContextProvider service="igbo">
      <ErrorPage errorCode={500} />
    </ServiceContextProvider>
  ))
  .add('404 - Pidgin', () => (
    <ServiceContextProvider service="pidgin">
      <ErrorPage errorCode={404} />
    </ServiceContextProvider>
  ))
  .add('500 - Pidgin', () => (
    <ServiceContextProvider service="pidgin">
      <ErrorPage errorCode={500} />
    </ServiceContextProvider>
  ))
  .add('404 - Yoruba', () => (
    <ServiceContextProvider service="yoruba">
      <ErrorPage errorCode={404} />
    </ServiceContextProvider>
  ))
  .add('500 - Yoruba', () => (
    <ServiceContextProvider service="yoruba">
      <ErrorPage errorCode={500} />
    </ServiceContextProvider>
  ));

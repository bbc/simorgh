import React from 'react';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ErrorPage from './ErrorPage';
import ThemeProvider from '../../components/ThemeProvider';

const Component = ({ service = 'news', status = 404 } = {}) => (
  <ThemeProvider service={service}>
    <ServiceContextProvider service={service}>
      <ErrorPage errorCode={status} />
    </ServiceContextProvider>
  </ThemeProvider>
);

export default {
  Component,
  title: 'Pages/Error Page',
};

export const News404 = () => <Component />;
export const News500 = () => <Component status={500} />;

export const Persian404 = () => <Component service="persian" />;
export const Persian500 = () => <Component service="persian" status={500} />;

export const Igbo404 = () => <Component service="igbo" />;
export const Igbo500 = () => <Component service="igbo" status={500} />;

export const Pidgin404 = () => <Component service="pidgin" />;
export const Pidgin500 = () => <Component service="pidgin" status={500} />;

export const Yoruba404 = () => <Component service="yoruba" />;
export const Yoruba500 = () => <Component service="yoruba" status={500} />;

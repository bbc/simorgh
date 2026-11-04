import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ErrorPage from './ErrorPage';
import ThemeProvider from '../../components/ThemeProvider';
import PageLayoutWrapper from '../../components/PageLayoutWrapper';

const Component = ({ service = 'news', status = 404 } = {}) => (
  <ThemeProvider service={service}>
    <ServiceContextProvider service={service}>
      <PageLayoutWrapper pageData={{}} status={status}>
        <ErrorPage errorCode={status} />
      </PageLayoutWrapper>
    </ServiceContextProvider>
  </ThemeProvider>
);

export default {
  Component,
  title: 'Pages/Error Page',
  parameters: { layout: 'fullscreen' },
};

export const News404 = () => <Component />;
export const News500 = () => <Component status={500} />;

export const Persian404 = () => <Component service="persian" />;
export const Persian500 = () => <Component service="persian" status={500} />;

Persian404.globals = {
  service: { service: 'persian', variant: 'default' },
};
Persian500.globals = {
  service: { service: 'persian', variant: 'default' },
};

export const Igbo404 = () => <Component service="igbo" />;
export const Igbo500 = () => <Component service="igbo" status={500} />;

Igbo404.globals = {
  service: { service: 'igbo', variant: 'default' },
};
Igbo500.globals = {
  service: { service: 'igbo', variant: 'default' },
};

export const Pidgin404 = () => <Component service="pidgin" />;
export const Pidgin500 = () => <Component service="pidgin" status={500} />;

Pidgin404.globals = {
  service: { service: 'pidgin', variant: 'default' },
};
Pidgin500.globals = {
  service: { service: 'pidgin', variant: 'default' },
};

export const Yoruba404 = () => <Component service="yoruba" />;
export const Yoruba500 = () => <Component service="yoruba" status={500} />;

Yoruba404.globals = {
  service: { service: 'yoruba', variant: 'default' },
};
Yoruba500.globals = {
  service: { service: 'yoruba', variant: 'default' },
};

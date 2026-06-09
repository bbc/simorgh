import { RequestContextProvider } from '#app/contexts/RequestContext';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import HeaderContainer from '.';
import { ToggleContextProvider } from '../../../contexts/ToggleContext';

const Component = () => (
  <ToggleContextProvider
    toggles={{
      scriptLink: {
        enabled: true,
      },
    }}
  >
    <HeaderContainer />
  </ToggleContextProvider>
);

export const GlobalLanguages = () => (
  <RequestContextProvider
    service="ws"
    pathname="/ws/languages"
    pageType="HOME_PAGE"
  >
    <Component service="ws" />
  </RequestContextProvider>
);

export default {
  title: 'Containers/Header',
  Component,
  parameters: {
    chromatic: { disable: true },
  },
};

export const Header = Component;

import { useRef } from 'react';
import ThemeProvider from '#app/components/ThemeProvider';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

import BrandContainer from '.';
import ScriptLink from '#app/components/Header/ScriptLink';

const BrandStory = ({
  service = 'news',
  variant = null,
  scriptLink = null,
}) => {
  const brandRef = useRef(null);

  return (
    <ToggleContextProvider
      toggles={{
        scriptLink: {
          enabled: true,
        },
      }}
    >
      <ThemeProvider service={service}>
        <ServiceContextProvider service={service} variant={variant}>
          <RequestContextProvider
            service={service}
            variant={variant}
            pathname="/"
          >
            <BrandContainer scriptLink={scriptLink} brandRef={brandRef} />
          </RequestContextProvider>
        </ServiceContextProvider>
      </ThemeProvider>
    </ToggleContextProvider>
  );
};

export default {
  title: 'Containers/Brand',
  component: BrandStory,
  parameters: { chromatic: { disable: true } },
};

export const Brand = () => <BrandStory />;
export const BrandZhongwen = () => (
  <BrandStory service="zhongwen" variant="simp" scriptLink={<ScriptLink />} />
);

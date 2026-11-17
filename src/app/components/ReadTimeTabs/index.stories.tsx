import { use, Fragment, PropsWithChildren } from 'react';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import {
  ServiceContext,
  ServiceContextProvider,
} from '#app/contexts/ServiceContext';
import { Services } from '#app/models/types/global';
import ThemeProvider from '#app/components/ThemeProvider';
import ReadTimeTabs from '.';
import {
  mixedItems,
  shortReadItems,
  longReadItems,
  arabicMixedItems,
  unclassifiableItems,
} from './fixtures';

const LongLabels = ({ children }: PropsWithChildren) => {
  const serviceConfig = use(ServiceContext);

  return (
    <ServiceContext.Provider
      value={{
        ...serviceConfig,
        translations: {
          ...serviceConfig.translations,
          readTimeRecommendations: {
            heading: 'Keep reading: stories matched to the time you have',
            shortReads: 'Quick stories you can finish in a few minutes',
            longReads: 'In-depth stories for when you have time to spare',
            fetchErrorMessage: 'Failed to load. Please try again later.',
          },
        },
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

type ComponentProps = {
  service?: Services;
  longLabels?: boolean;
  items?: unknown;
  isLoading?: boolean;
  isError?: boolean;
};

const Component = ({
  service = 'pidgin',
  longLabels = false,
  ...props
}: ComponentProps) => {
  const Wrapper = longLabels ? LongLabels : Fragment;

  return (
    <RequestContextProvider service={service} pageType="article" pathname="">
      <ServiceContextProvider service={service}>
        <ThemeProvider service={service}>
          <Wrapper>
            <ReadTimeTabs {...props} />
          </Wrapper>
        </ThemeProvider>
      </ServiceContextProvider>
    </RequestContextProvider>
  );
};

const parameters = { chromatic: { disableSnapshot: true } };

export const BothTabs = {
  render: () => <Component items={mixedItems} />,
  parameters,
};

export const OnlyShortReads = {
  render: () => <Component items={shortReadItems} />,
  parameters,
};

export const OnlyLongReads = {
  render: () => <Component items={longReadItems} />,
  parameters,
};

export const Loading = {
  render: () => <Component isLoading />,
  parameters,
};

export const FetchError = {
  render: () => <Component isError />,
  parameters,
};

// Nothing classifiable: the component renders nothing.
export const HiddenWhenNoClassifiableItems = {
  render: () => <Component items={unclassifiableItems} />,
  parameters,
};

export const LongTranslatedLabels = {
  render: () => <Component items={mixedItems} longLabels />,
  parameters,
};

export const RightToLeft = {
  render: () => <Component items={arabicMixedItems} service="arabic" />,
  parameters,
};

export default {
  title: 'Components/ReadTimeTabs',
  Component,
};

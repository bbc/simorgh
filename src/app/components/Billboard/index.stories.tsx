import { Summary } from '#app/models/types/curationData';
import Billboard from '.';
import { StoryArgs } from '../../models/types/storybook';
import metadata from './metadata.json';
import readme from './README.md';
import { kyrgyzBillboard, pidginLiveBillboard } from './fixtures';
import persianData from '../../../../data/persian/homePage/index.json';
import ThemeProvider from '../ThemeProvider';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

interface Props {
  text?: string;
  longText?: string;
  showLiveLabel?: boolean;
}

// Example for pidgin service and default variant
const service = 'pidgin';
const variant = 'default';

const Component = ({
  text = '',
  longText = '',
  showLiveLabel = false,
  link = 'https://www.bbc.co.uk/ws/languages',
  image = 'https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg',
  altText = 'alt text',
  summaries = [],
}: Props & {
  link?: string;
  image?: string;
  altText?: string;
  summaries?: Summary[];
}) => {
  return (
    <Billboard
      heading={text}
      description={longText}
      link={link}
      image={image}
      showLiveLabel={showLiveLabel}
      altText={altText}
      summaries={summaries}
    />
  );
};

export default {
  title: 'Components/Billboard',
  Component,
  parameters: {
    docs: { readme },
    metadata,
  },
};

export const Example = (_: StoryArgs, globalArgs: Props) => {
  const { text, longText } = globalArgs;

  return <Component text={text} longText={longText} />;
};

export const WithLiveLabel = (_: StoryArgs, globalArgs: Props) => {
  const { text, longText } = globalArgs;

  return <Component text={text} longText={longText} showLiveLabel />;
};

export const KyrgyzWithTwoSummaries = () => {
  const summary = kyrgyzBillboard.summaries[0];
  return (
    <Component
      text={summary.title}
      longText={summary.description || ''}
      link={summary.link}
      image={summary.imageUrl}
      altText={summary.imageAlt}
      summaries={kyrgyzBillboard.summaries}
    />
  );
};

export const PidginWithThreeSummaries = () => {
  const summary = pidginLiveBillboard.summaries[0];
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <Component
          text={summary.title}
          longText={summary.description || ''}
          link={summary.link}
          image={summary.imageUrl}
          altText={summary.imageAlt}
          summaries={pidginLiveBillboard.summaries.slice(0, 3)}
        />
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export const PidginLiveWithFourSummaries = () => {
  const summary = pidginLiveBillboard.summaries[0];
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <Component
          text={summary.title}
          longText={summary.description || ''}
          link={summary.link}
          image={summary.imageUrl}
          altText={summary.imageAlt}
          summaries={pidginLiveBillboard.summaries.slice(0, 4)}
          showLiveLabel
        />
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export const PidginLiveWithFiveSummaries = () => {
  const summary = pidginLiveBillboard.summaries[0];
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <Component
          text={summary.title}
          longText={summary.description || ''}
          link={summary.link}
          image={summary.imageUrl}
          altText={summary.imageAlt}
          summaries={pidginLiveBillboard.summaries.slice(0, 5)}
          showLiveLabel
        />
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export const PersianBillboard = () => {
  const summary = persianData.data.curations[2].summaries[0];
  return (
    <div dir="rtl">
      <ThemeProvider service="persian" variant="default">
        <ServiceContextProvider service="persian" variant="default">
          <Component
            text={summary.title}
            longText={summary.description || ''}
            link={summary.link}
            image={summary.imageUrl}
            altText={summary.imageAlt}
            summaries={persianData.data.curations[2].summaries}
          />
        </ServiceContextProvider>
      </ThemeProvider>
    </div>
  );
};

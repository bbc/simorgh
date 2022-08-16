import { ServiceContextProvider } from '#contexts/ServiceContext';
import Byline from '.';

interface Props {
  authorName: string;
  jobRole: string;
  service: string;
}

const Component = ({ authorName, jobRole, service }: Props) => {
  return (
    <ServiceContextProvider service={service}>
      <Byline authorName={authorName} jobRole={jobRole} />
    </ServiceContextProvider>
  );
};

export default {
  title: 'Components/Byline',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Example = () => (
  <Component
    authorName="Dario Russo"
    jobRole="Software Engineer"
    service="news"
  />
);

import React from 'react';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import Timestamp from '../../../legacy/containers/ArticleTimestamp';
import { bylineWithNameAndRole } from './fixture';
import Byline from '.';

interface Props {
  service: string;
  children?: JSX.Element;
}

const Component = ({ service, children }: Props) => {
  return (
    <ServiceContextProvider service={service}>
      <Byline blocks={bylineWithNameAndRole}>{children}</Byline>
    </ServiceContextProvider>
  );
};

export default {
  title: 'Components/Byline',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Example = () => <Component service="news" />;
export const ExampleWithTimestamp = () => (
  <Component service="news">
    <Timestamp
      firstPublished={1660658887}
      lastPublished={1660658887}
      popOut={false}
    />
  </Component>
);

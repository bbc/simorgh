import React from 'react';
import { DocsContainer, Title, DocsContextProps } from '@storybook/addon-docs';
import path from 'ramda/src/path';
import ThemeProvider from '../../src/app/components/ThemeProvider';
import HealthFactors from './HealthFactors';
import HealthFactorsMetadata from './types';

const DocsDecorator = ({
  context,
  children,
}: {
  context: DocsContextProps;
  children: JSX.Element;
}) => {
  const title = path(
    ['parameters', 'docs', 'component', 'title'],
    context,
  ) as string;

  const metadata = path(
    ['parameters', 'metadata'],
    context,
  ) as HealthsFactorMetadata;

  const kind = path(['kind'], context) as string;
  const lowerCaseKind = kind.toLowerCase();
  const isComponentDoc =
    lowerCaseKind.includes('components/') ||
    lowerCaseKind.includes('containers/') ||
    lowerCaseKind.includes('new components/') ||
    lowerCaseKind.includes('pages/') ||
    lowerCaseKind.includes('topic/');

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: type children not assignable.
    <DocsContainer context={context}>
      {isComponentDoc && (
        <ThemeProvider service="news" variant="default">
          <Title>{title}</Title>
          <HealthFactors metadata={metadata} />
        </ThemeProvider>
      )}
      {children}
    </DocsContainer>
  );
};

export default DocsDecorator;

import React from 'react';
import { DocsContainer, Title } from '@storybook/addon-docs';
import path from 'ramda/src/path';
import ThemeProvider from '../../src/app/components/ThemeProvider';
import { DocsContextProps } from '@storybook/addon-docs';
import HealthFactor from './HealthFactor';
import HealthFactorMetadata from './types';

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
  ) as HealthFactorMetadata;

  const kind = path(['kind'], context) as string;
  const lowerCaseKind = kind.toLowerCase();
  const isComponentDoc =
    lowerCaseKind.includes('components/') ||
    lowerCaseKind.includes('containers/') ||
    lowerCaseKind.includes('new components/') ||
    lowerCaseKind.includes('pages/') ||
    lowerCaseKind.includes('topic/');

  return (
    // @ts-ignore: type children not assignable.
    <DocsContainer context={context}>
      {isComponentDoc && (
        <ThemeProvider service="news" variant="default">
          <Title>{title}</Title>
          <HealthFactor metadata={metadata} />
        </ThemeProvider>
      )}
      {children}
    </DocsContainer>
  );
};

export default DocsDecorator;

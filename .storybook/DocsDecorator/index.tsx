import React from 'react';
import { DocsContainer, Title } from '@storybook/addon-docs';
import path from 'ramda/src/path';
import ThemeProvider from '../../src/app/components/ThemeProvider';
import { DocsContextProps } from '@storybook/addon-docs';
import HealthFactor from './HealthFactor';

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

  const metadata = path(['parameters', 'metadata'], context);

  return (
    // @ts-ignore: type children not assignable.
    <DocsContainer context={context}>
      <ThemeProvider service="news" variant="default">
        <Title>{title}</Title>
        <HealthFactor metadata={metadata} />
      </ThemeProvider>
      {children}
    </DocsContainer>
  );
};

export default DocsDecorator;

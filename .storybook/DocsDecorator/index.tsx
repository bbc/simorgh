import React from 'react';
import { DocsContainer, Title, DocsContextProps } from '@storybook/addon-docs';
import path from 'ramda/src/path';
import ThemeProvider from '../../src/app/components/ThemeProvider';
import HealthFactors from './HealthFactors';
import HealthFactorsMetadata from './types';
import { isExempt } from '../helpers/healthFactors';

interface DocsDecoratorProps {
  context: DocsContextProps;
  children: JSX.Element;
}

const DocsDecorator = ({ context, children }: DocsDecoratorProps) => {
  const title = path(
    ['parameters', 'docs', 'component', 'title'],
    context,
  ) as string;

  const metadata = path(
    ['parameters', 'metadata'],
    context,
  ) as HealthFactorsMetadata;

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: type children not assignable.
    <DocsContainer context={context}>
      {!isExempt(context) && (
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

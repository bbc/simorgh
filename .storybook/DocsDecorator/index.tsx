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
  const title = path<string>(
    ['attachedCSFFile', 'meta', 'parameters', 'docs', 'component', 'title'],
    context,
  );

  const metadata = path(
    ['attachedCSFFile', 'meta', 'parameters', 'metadata'],
    context,
  ) as HealthFactorsMetadata;

  return (
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

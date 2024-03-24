import React from 'react';
import { DocsContainer, Title, DocsContextProps } from '@storybook/addon-docs';
import path from 'ramda/src/path';
import ThemeProvider from '../../src/app/components/ThemeProvider';
import HealthFactors from './HealthFactors';
import HealthFactorsMetadata from './types';
// import { isExempt } from '../helpers/healthFactors';

interface DocsDecoratorProps {
  context: DocsContextProps;
  children: JSX.Element;
}

const DocsDecorator = ({ context, children }: DocsDecoratorProps) => {
  // @ts-ignore
  const [file] = context.attachedCSFFiles;
  const metadata = path(
    ['meta', 'parameters', 'metadata'],
    file,
  ) as HealthFactorsMetadata;

  return (
    <DocsContainer context={context}>
      {metadata && (
        <ThemeProvider service="news" variant="default">
          <Title />
          <HealthFactors metadata={metadata} />
        </ThemeProvider>
      )}
      {children}
    </DocsContainer>
  );
};

export default DocsDecorator;

import React from 'react';
import { DocsContainer, DocsContextProps } from '@storybook/addon-docs';
import { Markdown } from '@storybook/blocks';
import ThemeProvider from '../../src/app/components/ThemeProvider';
import HealthFactors from './HealthFactors';
import { HealthFactorsProps } from './types';

interface DocsDecoratorProps {
  context: DocsContextProps;
  children: JSX.Element;
}

const DocsDecorator = ({ context, children }: DocsDecoratorProps) => {
  // @ts-expect-error - CSF files are not typed
  const [file] = context.attachedCSFFiles;
  const { metadata, docs } = file?.meta?.parameters as HealthFactorsProps;

  return (
    <DocsContainer context={context}>
      <ThemeProvider service="news" variant="default">
        {metadata && <HealthFactors metadata={metadata} />}
        {docs?.readme && <Markdown>{docs.readme}</Markdown>}
      </ThemeProvider>
      {children}
    </DocsContainer>
  );
};

export default DocsDecorator;

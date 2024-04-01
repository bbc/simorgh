import React from 'react';
import { DocsContainer, Title, DocsContextProps } from '@storybook/addon-docs';
import ThemeProvider from '../../src/app/components/ThemeProvider';
import HealthFactors from './HealthFactors';
import { HealthFactorsProps } from './types';
import { Markdown } from '@storybook/blocks';

interface DocsDecoratorProps {
  context: DocsContextProps;
  children: JSX.Element;
}

const DocsDecorator = ({ context, children }: DocsDecoratorProps) => {
  // @ts-ignore
  const [file] = context.attachedCSFFiles;
  const { metadata, docs } = file?.meta?.parameters as HealthFactorsProps;

  return (
    <DocsContainer context={context}>
      <ThemeProvider service="news" variant="default">
        <Title />
        {metadata && <HealthFactors metadata={metadata} />}
        {docs?.readme && <Markdown>{docs.readme}</Markdown>}
      </ThemeProvider>
      {children}
    </DocsContainer>
  );
};

export default DocsDecorator;

import React from 'react';
import {
  DocsContainer,
  DocsContextProps,
  Title,
  Markdown,
  Stories,
} from '@storybook/addon-docs';
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
  const { metadata, docs } =
    (file?.meta?.parameters as HealthFactorsProps) ?? {};

  const hasReadmeFile = docs?.readme;
  const hasHealthFactors = metadata;

  return (
    <DocsContainer context={context}>
      <ThemeProvider service="news" variant="default">
        {hasReadmeFile && <Title />}
        {hasHealthFactors && <HealthFactors metadata={metadata} />}
        {hasReadmeFile && <Markdown>{docs.readme!}</Markdown>}
      </ThemeProvider>
      {children}
    </DocsContainer>
  );
};

export default DocsDecorator;

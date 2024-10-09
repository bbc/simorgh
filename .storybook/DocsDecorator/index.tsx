import React from 'react';
import {
  DocsContainer,
  DocsContextProps,
  Title,
  Markdown,
} from '@storybook/addon-docs';
import ThemeProvider from '../../src/app/components/ThemeProvider';
import HealthFactors from './HealthFactors';
import { HealthFactorsProps } from './types';

interface DocsDecoratorProps {
  context: DocsContextProps;
  children: JSX.Element;
}

const DocsDecorator = ({ context, children }: DocsDecoratorProps) => {
  const [file] = context.attachedCSFFiles;
  const { metadata, docs } =
    (file?.meta?.parameters as HealthFactorsProps) ?? {};

  const hasReadmeFile = docs?.readme;
  const hasHealthFactors = metadata;

  const isDocsPage = children?.type?.name === 'DocsPage';

  return (
    <DocsContainer context={context}>
      <ThemeProvider service="news" variant="default">
        {isDocsPage && <Title />}
        {hasHealthFactors && <HealthFactors metadata={metadata} />}
        {hasReadmeFile && <Markdown>{docs.readme}</Markdown>}
      </ThemeProvider>
      {!isDocsPage && children}
    </DocsContainer>
  );
};

export default DocsDecorator;

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

  console.log({type: children.type?.name});

  let content = children;

  if (children?.type?.name === 'DocsPage') {
    // @ts-expect-error do not display stories on docs page
    content = null;
  }

  return (
    <DocsContainer context={context}>
      <ThemeProvider service="news" variant="default">
        {hasReadmeFile && <Title />}
        {hasHealthFactors && <HealthFactors metadata={metadata} />}
        {hasReadmeFile && <Markdown>{docs.readme!}</Markdown>}
      </ThemeProvider>
      {content}
    </DocsContainer>
  );
};

export default DocsDecorator;

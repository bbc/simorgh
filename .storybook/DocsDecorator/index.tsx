import { type JSX } from 'react';
import {
  DocsContainer,
  DocsContextProps,
  Title,
  Markdown,
} from '@storybook/addon-docs/blocks';
import ThemeProvider from '../../src/app/components/ThemeProvider';
import HealthFactors from './HealthFactors';
import { HealthFactorsProps } from './types';

interface DocsDecoratorProps {
  context: DocsContextProps;
  children: JSX.Element;
}

const DocsDecorator = ({ context, children }: DocsDecoratorProps) => {
  // @ts-expect-error error TS2339: Property 'attachedCSFFiles' does not exist on type 'DocsContextProps<Renderer>'.
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
        {/* @ts-expect-error error TS2745: This JSX tag's 'children' prop expects type 'string' which requires multiple children, but only a single child was provided. */}
        {hasReadmeFile && <Markdown>{docs.readme}</Markdown>}
      </ThemeProvider>
      {!isDocsPage && children}
    </DocsContainer>
  );
};

export default DocsDecorator;

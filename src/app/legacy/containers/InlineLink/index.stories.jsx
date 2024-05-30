import React from 'react';
import InlineLinkContainer from '.';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import ThemeProvider from '../../../components/ThemeProvider';

const fragmentBlock = (text, attributes = []) => ({
  id: 1,
  type: 'fragment',
  model: {
    text,
    attributes,
  },
});

const Component = ({
  isExternal = false,
  locator = 'https://www.bbc.com/news',
  blocks,
}) => (
  <ThemeProvider service="news">
    <InlineLinkContainer
      locator={locator}
      blocks={blocks}
      isExternal={isExternal}
    />
  </ThemeProvider>
);

export default {
  title: 'Containers/Inline Link',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const InternalLink = () => (
  <Component blocks={[fragmentBlock('This is an internal link', [])]} />
);

export const InternalLinkBold = () => (
  <Component
    blocks={[fragmentBlock('This is an internal link which is bold', ['bold'])]}
  />
);

export const InternalLinkItalic = () => (
  <Component
    blocks={[
      fragmentBlock('This is an internal link which is italic', ['italic']),
    ]}
  />
);

export const InternalLinkBoldItalic = () => (
  <Component
    blocks={[
      fragmentBlock('This is an internal link which is bold & italic', [
        'bold',
        'italic',
      ]),
    ]}
  />
);

export const ExternalLinkNews = () => (
  <ServiceContextProvider service="news">
    <Component
      locator="https://www.example.com/"
      blocks={[fragmentBlock('This is an external link', [])]}
      isExternal
    />
  </ServiceContextProvider>
);

export const ExternalLinkPersian = () => (
  <ServiceContextProvider service="persian">
    <Component
      locator="https://www.example.com/"
      blocks={[fragmentBlock('این لینک هست', [])]}
      isExternal
    />
  </ServiceContextProvider>
);

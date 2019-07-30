import React from 'react';
import { storiesOf } from '@storybook/react';
import InlineLinkContainer from '.';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

const fragmentBlock = (text, attributes = []) => ({
  type: 'fragment',
  model: {
    text,
    attributes,
  },
});

storiesOf('Containers|InlineLink', module)
  .add('internal link', () => (
    <InlineLinkContainer
      locator="https://www.bbc.com/news"
      blocks={[fragmentBlock('This is an internal link', [])]}
      isExternal={false}
    />
  ))
  .add('internal link bold', () => (
    <InlineLinkContainer
      locator="https://www.bbc.com/news"
      blocks={[
        fragmentBlock('This is an internal link which is bold', ['bold']),
      ]}
      isExternal={false}
    />
  ))
  .add('internal link italic', () => (
    <InlineLinkContainer
      locator="https://www.bbc.com/news"
      blocks={[
        fragmentBlock('This is an internal link which is italic', ['italic']),
      ]}
      isExternal={false}
    />
  ))
  .add('internal link bold & italic', () => (
    <InlineLinkContainer
      locator="https://www.bbc.com/news"
      blocks={[
        fragmentBlock('This is an internal link which is bold & italic', [
          'bold',
          'italic',
        ]),
      ]}
      isExternal={false}
    />
  ))
  .add('external link - English aria-label text', () => (
    <ServiceContextProvider service="news">
      <InlineLinkContainer
        locator="https://www.example.com/"
        blocks={[fragmentBlock('This is an external link', [])]}
        isExternal
      />
    </ServiceContextProvider>
  ))
  .add('external link - Persian aria-label text', () => (
    <ServiceContextProvider service="persian">
      <InlineLinkContainer
        locator="https://www.example.com/"
        blocks={[fragmentBlock('این لینک هست', [''])]}
        isExternal
      />
    </ServiceContextProvider>
  ));

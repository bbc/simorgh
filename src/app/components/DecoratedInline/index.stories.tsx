import React from 'react';
import { Services } from '#app/models/types/global';
import { OptimoBlock } from '#app/models/types/optimo';
import ThemeProvider from '../ThemeProvider';
import DecoratedInlineLink from '.';
import { persianLink, fragmentBlock } from './fixture';

const Component = ({
  blocks,
  service,
}: {
  blocks: OptimoBlock[];
  service: Services;
}) => (
  <ThemeProvider service={service}>
    <DecoratedInlineLink blocks={blocks} />
  </ThemeProvider>
);

export const DecoratedInlineTextWithLink = () => (
  <Component
    blocks={[
      fragmentBlock('This is a normal inline text, followed by a link: '),
      persianLink,
    ]}
    service="persian"
  />
);

export default {
  title: 'Components/DecoratedInline',
  Component,
  parameters: {
    docs: {
      component: {
        title: 'DecoratedInline',
      },
    },
  },
};

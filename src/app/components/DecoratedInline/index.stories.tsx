import React from 'react';
import { OptimoBlock } from '#app/models/types/optimo';
import DecoratedInlineLink from '.';
import { persianLink, fragmentBlock } from './fixture';

const Component = ({
  blocks,
  language,
}: {
  blocks: OptimoBlock[];
  language: string;
}) => <DecoratedInlineLink blocks={blocks} language={language} />;

export const DecoratedInlineTextWithLink = () => (
  <Component
    blocks={[
      fragmentBlock('This is a normal inline text, followed by a link: '),
      persianLink,
    ]}
    language="fa"
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

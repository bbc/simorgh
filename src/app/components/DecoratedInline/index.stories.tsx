import React from 'react';
import { Services } from '#app/models/types/global';
import { OptimoBlock } from '#app/models/types/optimo';
import DecoratedInlineLink from '.';
import { persianLink, fragmentBlock } from './fixture';

const Component = ({
  blocks,
  language,
}: {
  blocks: OptimoBlock[];
  service: Services;
  language: string;
}) => <DecoratedInlineLink blocks={blocks} language={language} />;

export const DecoratedInlineTextWithLink = () => (
  <Component
    blocks={[
      fragmentBlock('This is a normal inline text, followed by a link: '),
      persianLink,
    ]}
    service="persian"
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

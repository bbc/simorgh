import React from 'react';
import { Services } from '#app/models/types/global';
import { OptimoBlock } from '#app/models/types/optimo';
import DecoratedInlineLink from '.';

const Component = ({
  blocks,
  locator,
  isExternal,
  onClick,
}: {
  blocks: OptimoBlock[];
  service: Services;
  locator: string;
  isExternal: boolean;
  onClick?: () => void;
}) => (
  <DecoratedInlineLink
    blocks={blocks}
    locator={locator}
    isExternal={isExternal}
    {...(onClick ? { onClick } : {})}
  />
);

export const NormalInlineLink = () => (
  <Component
    blocks={[
      {
        type: 'fragment',
        id: 'someId',
        model: {
          text: 'Normal Inline Link',
          attributes: [],
        },
      },
    ]}
    service="news"
    locator="google.com"
    isExternal
  />
);

export const BoldInlineLink = () => (
  <Component
    blocks={[
      {
        type: 'fragment',
        id: 'someId',
        model: {
          text: 'Bold Inline Link',
          attributes: ['bold'],
        },
      },
    ]}
    service="news"
    locator="google.com"
    isExternal
  />
);

export const BoldItalicInlineLink = () => (
  <Component
    blocks={[
      {
        type: 'fragment',
        id: 'someId',
        model: {
          text: 'Bold Italic Inline Link',
          attributes: ['bold', 'italic'],
        },
      },
    ]}
    service="news"
    locator="google.com"
    isExternal
  />
);

export const InlineLinkWithOnClick = () => (
  <Component
    blocks={[
      {
        type: 'fragment',
        id: 'someId',
        model: {
          text: 'Click me for an alert!',
          attributes: ['bold', 'italic'],
        },
      },
    ]}
    service="news"
    locator=""
    isExternal
    // eslint-disable-next-line no-alert
    onClick={() => alert('HELLO WORLD!')}
  />
);

export default {
  title: 'Components/DecoratedInlineLink',
  Component,
  parameters: {
    docs: {
      component: {
        title: 'DecoratedInlineLink',
      },
    },
  },
};

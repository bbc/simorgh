import React from 'react';
import { OptimoBlock } from '#app/models/types/optimo';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { StoryProps } from '#app/models/types/storybook';
import CaptionComponent from '.';
import captionBlock, {
  blockContainingPersianText,
  blocksWithInline,
} from './fixture';

interface Props extends StoryProps {
  type: string;
  block: OptimoBlock;
}

const Component = ({ service = 'news', block, type }: Props) => (
  <ServiceContextProvider service={service}>
    <CaptionComponent block={block} type={type} />
  </ServiceContextProvider>
);

export const DefaultCaption = () => (
  <Component
    block={captionBlock}
    service="news"
    variant="default"
    type="caption"
  />
);
export const PersianCaption = () => (
  <Component
    block={blockContainingPersianText}
    service="persian"
    variant="default"
    type="caption"
  />
);

export const InlineCaption = () => (
  <Component
    block={blocksWithInline}
    service="news"
    variant="default"
    type="caption"
  />
);

export default {
  title: 'Components/Caption',
  Component,
};

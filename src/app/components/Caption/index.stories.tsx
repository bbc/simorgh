import React from 'react';
import { OptimoBlock } from '#app/models/types/optimo';
import CaptionComponent from '.';
import captionBlock, {
  blockContainingPersianText,
  blocksWithInline,
} from './fixture';

type Props = {
  type: string;
  block: OptimoBlock;
};

const Component = ({ block, type }: Props) => (
  <CaptionComponent block={block} type={type} />
);

export const DefaultCaption = () => (
  <Component block={captionBlock} type="caption" />
);
export const PersianCaption = () => (
  <Component block={blockContainingPersianText} type="caption" />
);

export const InlineCaption = () => (
  <Component block={blocksWithInline} type="caption" />
);

export default {
  title: 'Components/Caption',
  Component,
};

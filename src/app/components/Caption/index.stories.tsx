import React from 'react';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { Services } from '#app/models/types/global';
import { OptimoBlock } from '#app/models/types/optimo';
import ThemeProvider from '../ThemeProvider';
import CaptionComponent from '.';
import captionBlock, {
  blockContainingPersianText,
  blocksWithInline,
} from './fixture';

type Props = {
  type: string;
  service: Services;
  block: OptimoBlock;
};

const Component = ({ block, service, type }: Props) => (
  <ServiceContextProvider service={service}>
    <ThemeProvider service={service}>
      <CaptionComponent block={block} type={type} />
    </ThemeProvider>
  </ServiceContextProvider>
);

export const DefaultCaption = () => (
  <Component block={captionBlock} service="news" type="caption" />
);
export const PersianCaption = () => (
  <Component
    block={blockContainingPersianText}
    service="persian"
    type="caption"
  />
);

export const InlineCaption = () => (
  <Component block={blocksWithInline} service="news" type="caption" />
);

export default {
  title: 'Components/Caption',
  Component,
  parameters: {
    docs: {
      component: {
        title: 'Caption',
      },
    },
  },
};

import React from 'react';
import withServicesDecorator from '#app/utilities/withServicesDecorator';
import { UnusedFirstArg } from '#app/models/types/storybook';
import { Services } from '../../models/types/global';
// import notes from './README.md';
import VisuallyHiddenText from './index';
import metadata from './metadata.json';

interface Props {
  service: Services;
  text: string;
}

const Component = ({ service, text }: Props) => (
  <VisuallyHiddenText>
    {service === 'news' ? 'Visually hidden text' : text}
  </VisuallyHiddenText>
);

export default {
  title: 'Components/VisuallyHiddenText',
  Component,
  parameters: {
    metadata,
    docs: {
      // page: notes,
    },
  },
  decorators: [withServicesDecorator],
};

export const Example = (_: UnusedFirstArg, { service, text }: Props) => (
  <Component service={service} text={text} />
);

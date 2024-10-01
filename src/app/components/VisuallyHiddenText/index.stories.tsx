import React from 'react';
import { StoryArgs } from '#app/models/types/storybook';
import { Services } from '../../models/types/global';
import readme from './README.md';
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
    docs: { readme },
  },
};

export const Example = (_: StoryArgs, { service, text }: Props) => (
  <Component service={service} text={text} />
);

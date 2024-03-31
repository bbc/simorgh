import React from 'react';
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
  title: 'New Components/VisuallyHiddenText',
  Component,
  parameters: {
    metadata,
    docs: {
      // page: notes,
    },
  },
};

export const Example = ({ service, text }: Props) => (
  <Component service={service} text={text} />
);

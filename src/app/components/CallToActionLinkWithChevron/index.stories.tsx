import React, { PropsWithChildren } from 'react';

import { SerializedStyles } from '@emotion/react';
import CallToActionLinkWithChevron from '.';
import { CallToActionLinkProps } from '../CallToActionLink/types';
import metadata from './metadata.json';

const Component = ({
  href,
  children,
}: PropsWithChildren<
  CallToActionLinkProps & { chevronStyles?: () => SerializedStyles }
>) => (
  <CallToActionLinkWithChevron href={href}>
    {children}
  </CallToActionLinkWithChevron>
);

export default {
  title: 'Components/Call To Action Link With Chevron',
  Component,
  parameters: {
    chromatic: { disable: false },
    metadata,
  },
};

export const Example = () => {
  return (
    <Component href="https://www.bbc.com/ws/languages">
      Call To Action
    </Component>
  );
};

import React, { PropsWithChildren } from 'react';

import { CallToActionLinkProps } from './types';
import CallToActionLink from '.';

const Component = ({
  href,
  children,
}: PropsWithChildren<CallToActionLinkProps>) => (
  <CallToActionLink href={href}>{children}</CallToActionLink>
);

export default {
  title: 'Components/Call To Action Link',
  Component,
};

export const Example = () => {
  return <Component href="www.bbc.com/afrique">Call To Action</Component>;
};

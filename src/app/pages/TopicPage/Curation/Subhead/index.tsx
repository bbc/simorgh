import React, { useContext } from 'react';

import { H2 } from './index.styled';

import { RightChevron } from '../../icons';

import { ServiceContext } from '../../../../contexts/ServiceContext';

interface Props {
  children: React.ReactNode;
  href?: string;
}

const Subhead = ({ children, href }: Props) => {
  const { service, script } = useContext(ServiceContext) as {
    script: string;
    service: string;
  };
  const Wrapper = href
    ? ({ children: innerChildren }) => (
        <a href={href}>
          {innerChildren} <RightChevron />
        </a>
      )
    : React.Fragment;
  return (
    <H2 service={service} script={script} id="content" tabIndex={-1}>
      <Wrapper>{children}</Wrapper>
    </H2>
  );
};

Subhead.defaultProps = { href: '' };

export default Subhead;

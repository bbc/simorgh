import React, { useContext } from 'react';

import Link from './index.styled';

import { LeftChevron, RightChevron } from '../../icons';

import { ServiceContext } from '../../../../contexts/ServiceContext';

interface Props {
  children: React.ReactNode;
  href?: string;
}

const Subhead = ({ children, href }: Props) => {
  const { service, script, dir } = useContext(ServiceContext) as {
    script: string;
    service: string;
    dir: string;
  };
  const Wrapper = href
    ? ({ children: innerChildren }) => (
        <Link href={href} service={service} script={script}>
          <span>{innerChildren}</span>
          {dir === 'ltr' ? <RightChevron /> : <LeftChevron />}
        </Link>
      )
    : React.Fragment;
  return (
    <h2 id="content" tabIndex={-1}>
      <Wrapper>{children}</Wrapper>
    </h2>
  );
};

Subhead.defaultProps = { href: '' };

export default Subhead;

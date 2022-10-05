import React, { Fragment, PropsWithChildren, useContext } from 'react';

import H2 from './index.styled';

import { LeftChevron, RightChevron } from '../../../../components/icons';

import { ServiceContext } from '../../../../contexts/ServiceContext';

interface Props {
  href?: string;
  a11yID?: string;
}

const Subhead = ({ children, href, a11yID }: PropsWithChildren<Props>) => {
  const { service, script, dir } = useContext(ServiceContext);

  const Wrapper = href
    ? ({ children: innerChildren }: PropsWithChildren<Props>) => (
        <a href={href}>
          <span>{innerChildren}</span>
          {dir === 'ltr' ? <RightChevron /> : <LeftChevron />}
        </a>
      )
    : Fragment;
  return (
    <H2 service={service} script={script} id={a11yID}>
      <Wrapper>{children}</Wrapper>
    </H2>
  );
};

Subhead.defaultProps = { href: '', a11yID: '' };

export default Subhead;

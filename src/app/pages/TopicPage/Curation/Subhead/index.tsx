import React, { useContext } from 'react';
import styled from '@emotion/styled';

import { getDoublePica } from '../../../../legacy/psammead/gel-foundations/src/typography';
import { RightChevron } from '../../icons';

import { ServiceContext } from '../../../../contexts/ServiceContext';
import { getSansBold } from '../../../../legacy/psammead/psammead-styles/src/font-styles';
import { C_GREY_10 } from '../../../../legacy/psammead/psammead-styles/src/colours';

interface Props {
  children: React.ReactNode;
  href?: string;
}

const H2 = styled.h2<{ service: string; script: string }>`
  ${({ service }) => getSansBold(service)}
  color: ${C_GREY_10};
  ${({ script }) => getDoublePica(script)}
`;

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

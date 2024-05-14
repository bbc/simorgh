import React from 'react';
import styled from '@emotion/styled';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import { getLongPrimer } from '#psammead/gel-foundations/src/typography';

const AVATAR_DIAMETER = '4rem';

const Container = styled.div`
  align-items: center;
  display: flex;

  /* Support RTL */
  ${({ avatar }) =>
    avatar &&
    `
      margin-right: -${GEL_SPACING};
      margin-left: -${GEL_SPACING};
    `}
`;

const Avatar = styled.img`
  border-radius: 50%;
  height: ${AVATAR_DIAMETER};
  margin-right: ${GEL_SPACING};
  margin-left: ${GEL_SPACING};
  width: ${AVATAR_DIAMETER};
`;

const Person = styled.ul`
  list-style: none;
  margin-top: 0;
  margin-bottom: 0;
  padding-right: 0;
  padding-left: 0;
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => getLongPrimer(script)}
`;

const Name = styled.li`
  color: ${props => props.theme.palette.SHADOW};
`;
const Title = styled.li`
  color: ${props => props.theme.palette.METAL};
`;

const Byline = ({ service, script, name, title, avatar = null }) => (
  <Container avatar={avatar}>
    {avatar && <Avatar src={avatar.src} alt={avatar.alt || ''} />}
    <Person role="list" service={service} script={script}>
      <Name role="listitem" avatar={avatar}>
        {name}
      </Name>
      <Title role="listitem">{title}</Title>
    </Person>
  </Container>
);

export default Byline;

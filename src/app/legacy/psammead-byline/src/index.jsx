import React from 'react';
import { string, shape } from 'prop-types';
import styled from '@emotion/styled';
import { getSansRegular } from '#legacy/psammead-styles/src/font-styles';
import { GEL_SPACING } from '#legacy/gel-foundations/src/spacings';
import { C_METAL, C_SHADOW } from '#legacy/psammead-styles/src/colours';
import { getLongPrimer } from '#legacy/gel-foundations/src/typography';

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
  color: ${C_SHADOW};
`;
const Title = styled.li`
  color: ${C_METAL};
`;

const Byline = ({ service, script, name, title, avatar }) => (
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

Byline.defaultProps = {
  avatar: null,
};

Byline.propTypes = {
  service: string.isRequired,
  script: string.isRequired,
  avatar: shape({
    src: string.isRequired,
    alt: string,
  }),
  name: string.isRequired,
  title: string.isRequired,
};

export default Byline;

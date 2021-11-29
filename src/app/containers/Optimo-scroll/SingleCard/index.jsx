import React, { useContext } from 'react';
import { string, oneOf } from 'prop-types';
import styled from '@emotion/styled';

import { getBrevier, getPica } from '@bbc/gel-foundations/dist/typography';
import { getSerifBold } from '@bbc/psammead-styles/dist/font-styles';
import { C_GREY_6 } from '@bbc/psammead-styles/dist/colours';

import Timestamp from '@bbc/psammead-timestamp';

import { ServiceContext } from '#contexts/ServiceContext';

const C_GREY_8 = '#202224';

// padding? widhth? height? different for phones?
const SingleCardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  box-sizing: content-box;
  width: 200px;
  height: 100px;
  background-color: yellow;
  padding: 1rem;
`;

// import Grey_8 in Psammead
const LinkWrapper = styled.a`
  ${({ script }) => script && getPica(script)};
  ${({ service }) => service && getSerifBold(service)};
  align-self: ${({ dir }) => (dir === 'ltr' ? 'flex-start' : 'flex-end')};
  color: ${C_GREY_8};
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  &:hover {
    text-decoration: underline;
  }
  &:focus {
    text-decoration: underline;
  }

  &:visited {
    color: ${C_GREY_6};
  }
`;

const StyledTimestamp = styled(Timestamp)`
  ${({ script }) => script && getBrevier(script)};
  ${({ service }) => service && getSerifBold(service)};
  align-self: ${({ dir }) => (dir === 'ltr' ? 'start' : 'end')};
  justify-self: flex-end;
  color: ${C_GREY_6};
`;

const SingleCard = ({ title, dateTime, href, dir }) => {
  // eslint-disable-next-line no-param-reassign
  dir = 'rtl';
  const { service, script } = useContext(ServiceContext);

  return (
    <SingleCardBox>
      <LinkWrapper href={href} service={service} script={script} dir={dir}>
        dateTimadva,nsbvmn ,abmnvc bmnzbcvnm,bzxnmbvm nbvcnmzb,mnbczmn,bvmnb
        cmn,b,cnzbcm,nvb
      </LinkWrapper>
      <StyledTimestamp
        datetime={dateTime}
        typographyFunc={getPica}
        script={script}
        service={service}
      >
        dateTimeds
      </StyledTimestamp>
    </SingleCardBox>
  );
};

SingleCard.propTypes = {
  title: string.isRequired,
  dateTime: string.isRequired,
  href: string.isRequired,
  dir: oneOf(['ltr', 'rtl']).isRequired,
};

export default SingleCard;

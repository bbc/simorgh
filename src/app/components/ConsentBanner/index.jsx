import React from 'react';
import { string, element } from 'prop-types';
import styled from 'styled-components';
import {
  C_CONSENT_BACKGROUND,
  C_CONSENT_ACTION,
  C_CONSENT_CONTENT,
  C_WHITE,
} from '@bbc/psammead-styles/colours';
import {
  GEL_GREAT_PRIMER,
  GEL_LONG_PRIMER,
  GEL_FF_REITH_SANS,
} from '@bbc/gel-foundations/typography';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_MARGIN_BELOW_400PX,
  GEL_MARGIN_ABOVE_400PX,
} from '@bbc/gel-foundations/spacings';

const Wrapper = styled.div`
  font-family: ${GEL_FF_REITH_SANS};
  background-color: ${C_CONSENT_BACKGROUND};
  padding: 16px ${GEL_MARGIN_BELOW_400PX};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_MARGIN_ABOVE_400PX};
  }
`;

const CenterWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;

  &::after {
    content: '\\0020';
    display: block;
    height: 0;
    clear: both;
    overflow: hidden;
    visibility: hidden;
  }
`;

const Title = styled.h2`
  ${GEL_GREAT_PRIMER}
  color: ${C_WHITE};
  font-weight: 700;
  padding: 0;
  margin: 0;

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: 22%;
    margin-right: 3.5%;
    float: left;
  }
`;

const Options = styled.ul`
  ${GEL_LONG_PRIMER}
  color: ${C_CONSENT_ACTION};
  font-weight: 600;
  padding: 0;
  margin: 0;
  list-style-type: none;

  & li + li {
    padding-top: 8px;
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: 18%;
    float: right;
  }
`;

export const ConsentBannerText = styled.p`
  ${GEL_LONG_PRIMER};
  color: ${C_CONSENT_CONTENT};

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin: 0;
    float: left;
    width: 53%;
  }
`;

export const ConsentBannerButton = styled.button`
  ${GEL_GREAT_PRIMER}
  color: ${C_CONSENT_ACTION};
  font-weight: 700;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
`;

export const ConsentBannerLink = styled.a`
  color: ${C_CONSENT_ACTION};
  text-decoration: none;
`;

export const ConsentBanner = ({ title, text, accept, reject }) => (
  <Wrapper>
    <CenterWrapper>
      <Title>{title}</Title>
      {text}
      <Options>
        <li>{accept}</li>
        <li>{reject}</li>
        <li>{reject}</li>
        <li>{reject}</li>
        <li>{reject}</li>
      </Options>
    </CenterWrapper>
  </Wrapper>
);

ConsentBanner.propTypes = {
  title: string.isRequired,
  text: element.isRequired,
  accept: element.isRequired,
  reject: element.isRequired,
};

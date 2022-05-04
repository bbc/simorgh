import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { string, number } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import { getSansBold } from '@bbc/psammead-styles/font-styles';
import { C_GREY_10 } from '@bbc/psammead-styles/colours';
import {
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_SPACING_QUIN,
  GEL_SPACING_SEXT,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';

const H1 = styled.h1`
  ${({ service }) => getSansBold(service)}
  color: ${C_GREY_10};
  margin: ${GEL_SPACING_TRPL} 0;
  font-size: 1.75rem;
  line-height: 2rem;
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin: ${GEL_SPACING_QUAD} 0 ${GEL_SPACING_QUAD} 0;
    font-size: 2rem;
    line-height: 2.25rem;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin: ${GEL_SPACING_SEXT} 0 ${GEL_SPACING_SEXT} 0;
    font-size: 3.25rem;
    line-height: 3.5rem;
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin: ${GEL_SPACING_QUIN} 0 ${GEL_SPACING_SEXT} 0;
    font-size: 2.75rem;
    line-height: 3rem;
  }
`;

const getTranslation = translations => ({
  pageXOfY: 'Page {x} of {y}',
  ...translations.pagination,
});

const TopicTitle = ({ title, activePage, pageCount }) => {
  const { script, service, translations, brandName } =
    useContext(ServiceContext);
  const { pageXOfY } = getTranslation(translations);
  const translatedPage = pageXOfY
    .replace('{x}', activePage)
    .replace('{y}', pageCount);

  return (
    <H1 service={service} script={script} id="content" tabIndex="-1">
      {pageCount > 1
        ? `${title}, ${translatedPage} - ${brandName}`
        : `${title} - ${brandName}`}
    </H1>
  );
};

TopicTitle.propTypes = {
  title: string.isRequired,
  activePage: number,
  pageCount: number,
};

TopicTitle.defaultProps = {
  activePage: '1',
  pageCount: '1',
};

export default TopicTitle;

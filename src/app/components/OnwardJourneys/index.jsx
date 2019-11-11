import React from 'react';
import InlineLink from '@bbc/psammead-inline-link';
import Img from '@bbc/psammead-image';
import { arrayOf, shape, string } from 'prop-types';
import styled from 'styled-components';
import { C_EBON, C_LUNAR, C_WHITE } from '@bbc/psammead-styles/colours';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import {
  getDoublePica,
  getPica,
  getGreatPrimer,
} from '@bbc/gel-foundations/typography';
import {
  getSansRegular,
  getSerifMedium,
  getSansBold,
} from '@bbc/psammead-styles/font-styles';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';

const RightArrowSVG = ({ height = '44px', width = '44px' }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    height={height}
    width={width}
    viewBox="0 0 44 44"
    enableBackground="new 0 0 44 44"
    xmlSpace="preserve"
  >
    <g id="arrow-right" fill="#222222">
      <rect width="44" height="44" fill="#222222" />
      <rect x="2" y="2" width="40" height="40" fill="#FFFFFF" />
      <polygon points="31,22 13,11 13,15.9 23.1,22 13,28.1 13,33" />
    </g>
  </svg>
);
RightArrowSVG.propTypes = {
  height: string.isRequired,
  width: string.isRequired,
};

const LeftArrowSVG = ({ height = '44px', width = '44px' }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    height={height}
    width={width}
    viewBox="0 0 44 44"
    enableBackground="new 0 0 18 22"
    xmlSpace="preserve"
  >
    <g id="arrow-left" fill="#6e6e73">
      <rect width="44" height="44" fill="#6e6e73" />
      <rect x="2" y="2" width="40" height="40" fill="#f2f2f2" />
      <polygon points="13,22 31,33 31,28.1 20.9,22 31,15.9 31,11" />
    </g>
  </svg>
);

LeftArrowSVG.propTypes = {
  height: string.isRequired,
  width: string.isRequired,
};

const OnwardJourneys = ({ onwardJourneysData, service, script }) => {
  const selectedTopic = 'Climate change';
  const selectedTopicData = onwardJourneysData.filter(
    topics => topics.name === selectedTopic,
  )[0];
  const visibleRecords = selectedTopicData.records;

  const OnwardJourneysWrapper = styled.div`
    padding-top: calc(4 * ${GEL_SPACING_DBL});
    padding-bottom: calc(2 * ${GEL_SPACING_DBL});
    background-color: ${C_LUNAR};
  `;
  const HeadingWrapper = styled.div`
    padding: 0 ${GEL_SPACING_DBL} 0 ${GEL_SPACING_DBL};
    min-width: 20%;
  `;
  const TabsList = styled.div`
    padding: ${GEL_SPACING_DBL};
  `;
  const Tab = styled.button`
    border: none;
    ${getGreatPrimer(script)};
    ${getSansBold(service)};
    color: ${C_EBON};
    background-color: ${C_LUNAR};
    padding: ${GEL_SPACING} ${GEL_SPACING_DBL};
    &:first-child {
      background-color: ${C_EBON};
      color: ${C_WHITE};
    }
  `;
  const Carousel = styled.div`
    overflow: hidden;
    padding: 0;
    margin: 0;
    border: 0;
  `;
  const Arrows = styled.div`
    position: absolute;
    top: 6.5rem;
    right: 20rem;
  `;
  const ArrowButton = styled.button`
    border: none;
    background-color: ${C_LUNAR};
  `;
  const CardList = styled.ul`
    display: block;
    list-style-type: none;
    margin: 0 ${GEL_SPACING_DBL};
    padding: 0;
  `;
  const Card = styled.li`
    background-color: ${C_WHITE};
    display: inline-block;
    width: calc(20% - 4 * ${GEL_SPACING});
    margin: 0 ${GEL_SPACING} ${GEL_SPACING_DBL} ${GEL_SPACING};
  `;
  const CardLink = styled.a`
    text-decoration: none;
  `;
  const CardHeadline = styled.h4`
    color: ${C_EBON};
    ${getSerifMedium(service)}
    ${getPica(script)}
  `;
  const TopicLink = styled(InlineLink)`
    ${getPica(script)};
    ${getSansRegular(service)}
    color: ${C_EBON};
    margin: ${GEL_SPACING_DBL}
`;
  const OnwardJourneysHeading = styled.h2`
    ${getDoublePica(script)};
    ${getSansRegular(service)};
    color: ${C_EBON};
    margin: 0 ${GEL_SPACING_DBL};
  `;

  return (
    <OnwardJourneysWrapper>
      <OnwardJourneysHeading script={script} service={service}>
        More from the BBC
      </OnwardJourneysHeading>
      <Carousel>
        <Arrows>
          <ArrowButton type="button">
            <VisuallyHiddenText>Scroll carousel left</VisuallyHiddenText>
            <LeftArrowSVG />
          </ArrowButton>
          <ArrowButton type="button">
            <VisuallyHiddenText>Scroll carousel right</VisuallyHiddenText>
            <RightArrowSVG />
          </ArrowButton>
        </Arrows>
        <TabsList>
          {onwardJourneysData.map(topic => (
            <Tab key={topic.name}>{topic.name}</Tab>
          ))}
          <Tab />
        </TabsList>
      </Carousel>
      <CardList>
        {visibleRecords.map(record => (
          <CardLink href={record.url} key={record.headline}>
            <Card>
              <HeadingWrapper>
                <CardHeadline>{record.headline}</CardHeadline>
              </HeadingWrapper>
              <Img
                src={record.image.href}
                width="100%"
                alt={record.image.altText}
              />
            </Card>
          </CardLink>
        ))}
      </CardList>
      <TopicLink script={script} service={service} href={selectedTopicData.url}>
        {selectedTopicData.name}
      </TopicLink>
    </OnwardJourneysWrapper>
  );
};

OnwardJourneys.propTypes = {
  onwardJourneysData: arrayOf(
    shape({ href: string.isRequired, name: string.isRequired }),
  ).isRequired,
  service: string.isRequired,
  script: string.isRequired,
};

export default OnwardJourneys;

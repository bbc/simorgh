import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { LUNAR } from '#app/components/ThemeProvider/palette';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { getBrevier } from '#psammead/gel-foundations/src/typography';

const MIN_TAG_HEIGHT = '2.75rem'; // 44px

const CONTAINER_STYLES = `
  display: flex;
  flex-wrap: wrap;
  margin-top: -${GEL_SPACING};
  margin-bottom: 0;
  margin-left: -${GEL_SPACING_HLF};
  margin-right: -${GEL_SPACING_HLF};
  padding: 0;
`;

const SingleTopicTagContainer = styled.div`
  ${CONTAINER_STYLES}
`;

const TopicsList = styled.ul`
  ${CONTAINER_STYLES}
  list-style-type: none;
`;

const SingleTopicTagItem = styled.div`
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => script && getBrevier(script)}

  word-break: break-word;
  margin-top: ${GEL_SPACING};
  margin-left: ${GEL_SPACING_HLF};
  margin-right: ${GEL_SPACING_HLF};
  a {
    display: inline-flex;
    min-height: ${MIN_TAG_HEIGHT};
    padding: ${GEL_SPACING} ${GEL_SPACING_DBL};
    align-items: center;
    background-color: ${({ backgroundColour, theme }) =>
      theme.isDarkUi ? theme.palette.GREY_7 : backgroundColour};
    text-decoration: none;
    color: ${({ theme }) =>
      theme.isDarkUi ? theme.palette.GREY_2 : theme.palette.EBON};

    &:hover,
    &:focus {
      text-decoration: underline;
    }
    &:visited {
      color: ${({ theme }) =>
        theme.isDarkUi ? theme.palette.GREY_2 : theme.palette.METAL};
    }
  }
`;

export const TopicTag = forwardRef(({ name, link, onClick = null }, ref) => (
  <a href={link} onClick={onClick} ref={ref}>
    {name}
  </a>
));

export const TopicTags = ({
  children = [],
  script,
  service,
  tagBackgroundColour = LUNAR,
}) => {
  const hasMultipleChildren = children.length > 1;

  return (
    <>
      {hasMultipleChildren ? (
        <TopicsList role="list" service={service} script={script}>
          {children.map((child, index) => {
            if (child.type !== TopicTag) return null;

            return (
              <SingleTopicTagItem
                as="li"
                backgroundColour={tagBackgroundColour}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                service={service}
                script={script}
              >
                {child}
              </SingleTopicTagItem>
            );
          })}
        </TopicsList>
      ) : (
        <SingleTopicTagContainer service={service} script={script}>
          <SingleTopicTagItem
            service={service}
            script={script}
            backgroundColour={tagBackgroundColour}
          >
            {children.type === TopicTag && children}
          </SingleTopicTagItem>
        </SingleTopicTagContainer>
      )}
    </>
  );
};

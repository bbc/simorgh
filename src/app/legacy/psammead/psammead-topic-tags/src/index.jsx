import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { POSTBOX, WHITE } from '#app/components/ThemeProvider/palette';
import { GEL_SPACING, GEL_SPACING_DBL } from '#psammead/gel-foundations/src/spacings';

const MIN_TAG_HEIGHT = '2.75rem'; // 44px

const CONTAINER_STYLES = `
  display: flex;
  flex-wrap: wrap;
  gap: ${GEL_SPACING};
  margin: 0;
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
  ${({ theme: { fontVariants } }) => fontVariants.sansBold};
  ${({ theme: { fontSizes } }) => fontSizes.bodyCopy};

  word-break: break-word;
  min-width: 0;
  a {
    display: inline-flex;
    min-height: ${MIN_TAG_HEIGHT};
    padding: ${GEL_SPACING} ${GEL_SPACING_DBL};
    align-items: center;
    background-color: ${({ backgroundColour, theme }) =>
      theme.isDarkUi ? theme.palette.GREY_7 : backgroundColour};
    border: 1px solid
      ${({ theme }) =>
        theme.isDarkUi ? theme.palette.GREY_6 : theme.palette.GREY_3};
    text-decoration: none;
    color: ${({ theme }) =>
      theme.isDarkUi ? theme.palette.GREY_2 : theme.palette.EBON};

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.palette.POSTBOX || POSTBOX};
      text-decoration: underline;
    }
  }
`;

export const TopicTag = forwardRef(
  ({ name, link, ...staticComponentTrackers }, ref) => (
    <a href={link} ref={ref} {...staticComponentTrackers}>
      {name}
    </a>
  ),
);

export const TopicTags = ({
  children = [],
  script,
  service,
  tagBackgroundColour = WHITE,
}) => {
  const hasMultipleChildren = children.length > 1;

  return hasMultipleChildren ? (
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
  );
};

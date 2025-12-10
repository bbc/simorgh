import React, {
  AnchorHTMLAttributes,
  Children,
  ReactElement,
  forwardRef,
} from 'react';
import styled from '@emotion/styled';
import { POSTBOX, WHITE } from '#app/components/ThemeProvider/palette';
import { GEL_SPACING, GEL_SPACING_DBL } from '#psammead/gel-foundations/src/spacings';
import { Services } from '#app/models/types/global';

type TopicTagProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  name: string;
  link: string;
};

type TopicTagsProps = {
  children?: ReactElement<TopicTagProps> | ReactElement<TopicTagProps>[];
  script: object;
  service: Services;
  tagBackgroundColour?: string;
};

const MIN_TAG_HEIGHT = '2.75rem'; // 44px

const CONTAINER_STYLES = `
  display: flex;
  flex-wrap: wrap;
  gap: ${GEL_SPACING};
  margin: 0;
  padding: 0;
`;

const SingleTopicTagContainer = styled.div<{
  service: Services;
  script: object;
}>`
  ${CONTAINER_STYLES}
`;

const TopicsList = styled.ul<{
  service: Services;
  script: object;
}>`
  ${CONTAINER_STYLES}
  list-style-type: none;
`;

const SingleTopicTagItem = styled.div<{
  backgroundColour: string;
  service: Services;
  script: object;
}>`
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

export const TopicTag = forwardRef<HTMLAnchorElement, TopicTagProps>(
  ({ name, link, ...anchorProps }, ref) => (
    <a href={link} ref={ref} {...anchorProps}>
      {name}
    </a>
  ),
);

export const TopicTags = ({
  children,
  script,
  service,
  tagBackgroundColour = WHITE,
}: TopicTagsProps) => {
  const topicTagChildren = Children.toArray(children).filter(
    (child): child is ReactElement<TopicTagProps> =>
      React.isValidElement(child) && child.type === TopicTag,
  );

  if (topicTagChildren.length === 0) {
    return null;
  }

  const hasMultipleChildren = topicTagChildren.length > 1;

  return hasMultipleChildren ? (
    <TopicsList role="list" service={service} script={script}>
      {topicTagChildren.map((child, index) => (
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
      ))}
    </TopicsList>
  ) : (
    <SingleTopicTagContainer service={service} script={script}>
      <SingleTopicTagItem
        backgroundColour={tagBackgroundColour}
        service={service}
        script={script}
      >
        {topicTagChildren[0]}
      </SingleTopicTagItem>
    </SingleTopicTagContainer>
  );
};

export default TopicTags;

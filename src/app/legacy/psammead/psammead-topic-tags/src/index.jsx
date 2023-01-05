import React, { forwardRef } from 'react';
import { string, shape, node, func } from 'prop-types';
import styled from '@emotion/styled';
import {
  C_LUNAR,
  C_EBON,
  C_METAL,
  C_BLACK,
  C_WHITE,
} from '#psammead/psammead-styles/src/colours';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { getBrevier } from '#psammead/gel-foundations/src/typography';
import { scriptPropType } from '#psammead/gel-foundations/src/prop-types';

const MIN_TAG_HEIGHT = '2.75rem'; // 44px

// Focus visible indicator to show around all focusable elements, links, buttons etc, across the WS sites.
const focusIndicatorThickness = '0.1875rem';

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
    background-color: ${({ backgroundColour }) => backgroundColour};
    text-decoration: none;
    color: ${C_EBON};

    // remove focus
    &:hover {
      text-decoration: underline;
    }
    &:visited {
      color: ${C_METAL};
    }

    // SOLUTION 2 - using focus:not(:focus-visible)
    // Applies all rules to focus state
    &:focus {
      text-decoration: underline;
      outline: ${focusIndicatorThickness} solid ${C_BLACK};
      box-shadow: 0 0 0 ${focusIndicatorThickness} ${C_WHITE};
      outline-offset: ${focusIndicatorThickness};
    }
    //
    // Overrides these rules depending whether focus-visible state is being used, applies different styles to focus and focus-visible
    &:focus:not(:focus-visible) {
      outline: none;
      box-shadow: none;
      outline-offset: 0;
    }
    //
    &:focus-visible {
      outline: ${focusIndicatorThickness} solid ${C_BLACK};
      box-shadow: 0 0 0 ${focusIndicatorThickness} ${C_WHITE};
      outline-offset: ${focusIndicatorThickness};
  }
`;

export const TopicTag = forwardRef(({ name, link, onClick }, ref) => (
  <a href={link} onClick={onClick} ref={ref}>
    {name}
  </a>
));

export const TopicTags = ({
  children,
  script,
  service,
  tagBackgroundColour,
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

TopicTag.propTypes = {
  name: string.isRequired,
  link: string.isRequired,
  onClick: func,
};

TopicTag.defaultProps = { onClick: null };

TopicTags.propTypes = {
  children: node,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  tagBackgroundColour: string,
};

TopicTags.defaultProps = {
  children: [],
  tagBackgroundColour: C_LUNAR,
};

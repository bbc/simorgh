import React, { useContext } from 'react';
import { bool, shape, number, arrayOf, string } from 'prop-types';
import styled, { css } from 'styled-components';
import Grid from '@bbc/psammead-grid';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import SectionLabel from '@bbc/psammead-section-label';
import { C_LUNAR } from '@bbc/psammead-styles/colours';
import pathOr from 'ramda/src/pathOr';
import UsefulLinksComponent from './UsefulLinks';
import { ServiceContext } from '#contexts/ServiceContext';
import StoryPromo from '../StoryPromo';
import groupShape from '#models/propTypes/frontPageGroup';
import { storyItem } from '#models/propTypes/storyItem';
import idSanitiser from '#lib/utilities/idSanitiser';

// Apply the right margin-top to the first section of the page when there is one or multiple items.
const FirstSectionTopMargin = styled.div`
  ${({ oneItem }) =>
    oneItem
      ? css`
          @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
            margin-top: ${GEL_SPACING_TRPL};
          }

          @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
            margin-top: ${GEL_SPACING_QUAD};
          }
        `
      : css`
          @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
            margin-top: ${GEL_SPACING};
          }
        `}
`;

// Apply the right margin-top between the section label and the promos
const TopMargin = styled.div`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_TRPL};
  }
`;

// eslint-disable-next-line react/prop-types
const MarginWrapper = ({ isFirstSection, oneItem, children }) => {
  // Conditionally add a `margin-top` to the `children`.
  if (isFirstSection) {
    return (
      <FirstSectionTopMargin oneItem={oneItem}>
        {children}
      </FirstSectionTopMargin>
    );
  }

  if (oneItem) {
    return <TopMargin>{children}</TopMargin>;
  }

  return children;
};

const StoryPromoComponent = ({
  item,
  topStory,
  displayImage,
  isLeading,
  isFirstSection,
}) => {
  const lazyLoadImage = !(topStory && isFirstSection); // don't lazy load image if it is a top story
  return (
    <StoryPromo
      item={item}
      topStory={topStory}
      lazyLoadImage={lazyLoadImage}
      displayImage={displayImage}
      isLeading={isLeading}
    />
  );
};

StoryPromoComponent.propTypes = {
  item: shape(storyItem).isRequired,
  topStory: bool.isRequired,
  displayImage: bool,
  isLeading: bool,
  isFirstSection: bool,
};

StoryPromoComponent.defaultProps = {
  displayImage: true,
  isLeading: false,
  isFirstSection: false,
};

const defaultColumns = {
  group0: 6,
  group1: 6,
  group2: 6,
  group3: 6,
};

const fullWidthStoryPromoColumns = {
  ...defaultColumns,
  group4: 8,
  group5: 8,
};

const normalStoryPromoColumns = {
  ...defaultColumns,
  group4: 2,
  group5: 2,
};

const getTopStoryLayout = items => {
  /* We display 1 top story + 4 regular story promos.The top story spans the whole width
     We need to be sure that we have 4 story promos on a row.
     This means that we have to subtract 1(top-story) from the number of items and then divide the result by 4
     If the number of items was 6: (6-1) % 4 = 1
     To get the number of items that would fit (1 + 4 regular story promos) we subtract the above result from
     the number of items: 6 - 1 = 5. 5 is the number of items that fit the combination.
     */
  const remainder = (items.length - 1) % 4;
  const itemsToDisplay = items.length - remainder;
  // Maximum items to display should be capped to 13 since we are squashing topstories in the preprocessor rules
  const maxItems = itemsToDisplay > 13 ? 13 : itemsToDisplay;

  return {
    isLeadingStory: () => false,
    isTopStory: index => index === 0,
    itemsToDisplay: maxItems,
    imageDisplayThreshold: 9,
    columns: index =>
      index === 0 ? fullWidthStoryPromoColumns : normalStoryPromoColumns,
  };
};

const getSectionLayout = items => {
  const topColumns = {
    2: { ...defaultColumns, group4: 6, group5: 6 },
    1: fullWidthStoryPromoColumns,
    0: normalStoryPromoColumns,
  };

  /* We check if the number of items is divisible by four
     If the number of items is divisible by 4 then the storypromo should span 2 columns
     If the remainder is 1 we the story promo should span the whole width
     If the remainder is 2 then we should have two stories on the row with one being a leading story promo
  */
  let remainder = items.length % 4;
  let itemsToDisplay = items.length;
  if (remainder > 2) {
    itemsToDisplay = items.length - 1;
    remainder = 2;
  }

  return {
    isLeadingStory: index => index === 0 && remainder === 2,
    isTopStory: index => index === 0 && remainder === 1,
    itemsToDisplay,
    imageDisplayThreshold: items.length,
    columns: index =>
      index === 0 ? topColumns[remainder] : normalStoryPromoColumns,
  };
};

const renderStoryPromoList = (groupType, items, isFirstSection) => {
  const {
    itemsToDisplay,
    imageDisplayThreshold,
    isTopStory,
    isLeadingStory,
    columns,
  } =
    groupType === 'top-stories'
      ? getTopStoryLayout(items)
      : getSectionLayout(items);

  const storyPromoUlStyles = css`
    list-style-type: none;
    margin: 0;
    padding: 0;
  `;
  const GridList = styled(Grid)`
    ${storyPromoUlStyles}
  `;
  const GridListItem = styled(Grid)`
    border-bottom: 0.0625rem solid ${C_LUNAR};
    padding: ${GEL_SPACING} 0 ${GEL_SPACING_DBL};

    @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
      padding: ${GEL_SPACING_DBL} 0 ${GEL_SPACING_DBL};
    }

    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      padding: ${GEL_SPACING_TRPL} 0 ${GEL_SPACING_TRPL};
    }

    &:first-child {
      padding-top: 0;

      @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
        padding-top: 1rem;
      }

      @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
        padding-top: 1.5rem;
      }
    }

    &:last-child {
      padding-bottom: 0;
      border: none;
    }
  `;

  return (
    <GridList
      forwardedAs="ul"
      role="list"
      enableGelGutters
      columns={fullWidthStoryPromoColumns}
    >
      {items.slice(0, itemsToDisplay).map((item, index) => {
        const topStory = isTopStory(index);
        const displayImage = index < imageDisplayThreshold;
        const isLeading = isLeadingStory(index);
        const groups = columns(index);
        return (
          <GridListItem
            item
            columns={groups}
            key={item.id}
            as="li"
            role="listitem"
          >
            <StoryPromoComponent
              item={item}
              topStory={topStory}
              displayImage={displayImage}
              isFirstSection={isFirstSection}
              isLeading={isLeading}
            />
          </GridListItem>
        );
      })}
    </GridList>
  );
};

const StoryPromoRenderer = ({ items, isFirstSection, groupType }) => {
  if (items.length === 1) {
    return (
      <MarginWrapper isFirstSection={isFirstSection} oneItem>
        <Grid enableGelGutters columns={fullWidthStoryPromoColumns}>
          <Grid item columns={fullWidthStoryPromoColumns}>
            <StoryPromoComponent
              item={items[0]}
              topStory
              isFirstSection={isFirstSection}
            />
          </Grid>
        </Grid>
      </MarginWrapper>
    );
  }

  return (
    <MarginWrapper isFirstSection={isFirstSection}>
      {renderStoryPromoList(groupType, items, isFirstSection)}
    </MarginWrapper>
  );
};

StoryPromoRenderer.propTypes = {
  items: arrayOf(shape(storyItem)).isRequired,
  isFirstSection: bool.isRequired,
  groupType: string.isRequired,
};

const FrontPageSection = ({ bar, group, sectionNumber }) => {
  const { script, service, dir, translations } = useContext(ServiceContext);
  const sectionLabelId = idSanitiser(group.title);

  const strapline = pathOr(null, ['strapline', 'name'], group);
  const isLink = pathOr(null, ['strapline', 'type'], group) === 'LINK';
  const href = pathOr(null, ['strapline', 'links', 'mobile'], group);
  const items = pathOr(null, ['items'], group);
  const seeAll = pathOr(null, ['seeAll'], translations);
  const isFirstSection = sectionNumber === 0;

  // The current implementation of SectionLabel *requires* a strapline to be
  // present in order to render. It is currently *not possible* to render a
  // section that does not have a strapline without breaking both the visual
  // *and especially* the screen reader UX.
  // If this group does not have a strapline; do not render!
  // This may change in the future, if a way to avoid breaking UX is found.
  // Also, don't render a section without any items.
  if (!(strapline && items) || items.length === 0) {
    return null;
  }

  return (
    // jsx-a11y considers `role="region"` on a <section> to be redundant.
    // (<section> tags *should* imply `role="region"`)
    // While this may be true in a perfect world, we set it in order to get
    // the greatest possible support.
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <section role="region" aria-labelledby={sectionLabelId}>
      <SectionLabel
        script={script}
        labelId={sectionLabelId}
        bar={bar}
        visuallyHidden={isFirstSection}
        service={service}
        dir={dir}
        linkText={isLink ? seeAll : null}
        href={href}
      >
        {group.strapline.name}
      </SectionLabel>
      {group.semanticGroupName === 'Useful links' ? (
        <UsefulLinksComponent items={items} script={script} service={service} />
      ) : (
        <StoryPromoRenderer
          items={items}
          isFirstSection={isFirstSection}
          groupType={group.type}
        />
      )}
    </section>
  );
};

FrontPageSection.defaultProps = {
  bar: true,
};

FrontPageSection.propTypes = {
  bar: bool,
  group: shape(groupShape).isRequired,
  sectionNumber: number.isRequired,
};

export default FrontPageSection;

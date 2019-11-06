import React, { useContext } from 'react';
import { bool, shape, number, arrayOf, string, node } from 'prop-types';
import styled, { css } from 'styled-components';
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
import Grid from '@bbc/psammead-grid';
import SectionLabel from '@bbc/psammead-section-label';
import { StoryPromoUl, StoryPromoLi } from '@bbc/psammead-story-promo-list';
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
const MarginWrapper = ({ firstSection, oneItem, children }) => {
  // Conditionally add a `margin-top` to the `children`.
  if (firstSection) {
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

const StoryPromoComponent = ({ item, displayImage, leading, topStory }) => {
  const lazyLoadImage = !topStory; // don't lazy load image if it is a top story

  return (
    <StoryPromo
      item={item}
      topStory={topStory}
      lazyLoadImage={lazyLoadImage}
      displayImage={displayImage}
      leading={leading}
    />
  );
};
StoryPromoComponent.defaultProps = {
  displayImage: true,
  leading: false,
  topStory: false,
};

StoryPromoComponent.propTypes = {
  item: shape(storyItem).isRequired,
  displayImage: bool,
  leading: bool,
  topStory: bool,
};

const columns = {
  normal: {
    group0: 6,
    group1: 6,
    group2: 6,
    group3: 6,
    group4: 2,
    group5: 2,
  },
  fullWidth: {
    group0: 6,
    group1: 6,
    group2: 6,
    group3: 6,
    group4: 8,
    group5: 8,
  },
};

const TopStories = ({ items, sectionNumber, firstSection }) => {
  const topColumns = {
    group0: 6,
    group1: 6,
    group2: 6,
    group3: 6,
    group4: 8,
    group5: 8,
  };

  const MAX_ITEMS = 13;
  const itemsToDisplay = items.length - ((items.length - 1) % 4);

  return (
    <MarginWrapper firstSection={firstSection}>
      <StoryPromoUl>
        <MainGridWrapper>
          {items
            .slice(0, MAX_ITEMS)
            .slice(0, itemsToDisplay)
            .map((item, index) => {
              const topStory = sectionNumber === 0 && index === 0;
              return (
                <Grid
                  item
                  columns={index === 0 ? topColumns : columns.normal}
                  key={item.id}
                >
                  <StoryPromoLi>
                    <StoryPromoComponent
                      item={item}
                      topStory={topStory}
                      displayImage={index < 9}
                    />
                  </StoryPromoLi>
                </Grid>
              );
            })}
        </MainGridWrapper>
      </StoryPromoUl>
    </MarginWrapper>
  );
};

TopStories.propTypes = {
  items: arrayOf(shape(storyItem)).isRequired,
  sectionNumber: number.isRequired,
  firstSection: bool.isRequired,
};

const FeaturedTopStories = ({ items, sectionNumber, firstSection }) => {
  const featuredColumns = [
    { group0: 6, group1: 6, group2: 6, group3: 6, group4: 6, group5: 6 },
    columns.normal,
  ];
  const MAX_ITEMS = 2;
  return (
    <MarginWrapper firstSection={firstSection}>
      <StoryPromoUl>
        <MainGridWrapper>
          {items.slice(0, MAX_ITEMS).map((item, index) => (
            <Grid item columns={featuredColumns[index]} key={item.id}>
              <StoryPromoLi>
                <StoryPromoComponent
                  item={item}
                  sectionNumber={sectionNumber}
                  storyNumber={index}
                  displayImage={index < 9}
                  leading={index === 0}
                />
              </StoryPromoLi>
            </Grid>
          ))}
        </MainGridWrapper>
      </StoryPromoUl>
    </MarginWrapper>
  );
};

FeaturedTopStories.propTypes = {
  items: arrayOf(shape(storyItem)).isRequired,
  sectionNumber: number.isRequired,
  firstSection: bool.isRequired,
};

const MainGridWrapper = ({ children }) => (
  <Grid
    enableGelGutters
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 8,
      group5: 8,
    }}
  >
    {children}
  </Grid>
);

MainGridWrapper.propTypes = {
  children: node.isRequired,
};

const StoryPromoRenderer = ({
  items,
  firstSection,
  sectionNumber,
  groupType,
}) => {
  if (items.length === 1) {
    return (
      <MarginWrapper firstSection={firstSection} oneItem>
        <MainGridWrapper>
          <Grid item columns={columns.fullWidth}>
            <StoryPromoComponent
              item={items[0]}
              sectionNumber={sectionNumber}
              storyNumber={0}
            />
          </Grid>
        </MainGridWrapper>
      </MarginWrapper>
    );
  }

  const Components = {
    'top-stories': TopStories,
    'featured-site-top-stories': FeaturedTopStories,
  };

  if (groupType in Components) {
    const Component = Components[groupType];
    return (
      <Component
        items={items}
        sectionNumber={sectionNumber}
        firstSection={firstSection}
      />
    );
  }

  if (items.length < 4) {
    return <div> we cannot show a slice with {items.length} items </div>;
  }
  const elements = items.length > 10 ? 10 : items.length;
  let remainder = elements % 4;
  if (remainder > 2) {
    // eslint-disable-next-line no-param-reassign
    items = items.slice(0, 6);
    remainder = 2;
  }
  const groups = {
    0: columns.normal,
    1: columns.fullWidth,
    2: { group0: 6, group1: 6, group2: 6, group3: 6, group4: 6, group5: 6 },
  };

  return (
    <MarginWrapper firstSection={firstSection}>
      <StoryPromoUl>
        <MainGridWrapper>
          {items.slice(0, 10).map((item, index) => (
            <Grid
              item
              columns={index === 0 ? groups[remainder] : columns.normal}
              key={item.id}
            >
              <StoryPromoLi>
                <StoryPromoComponent
                  item={item}
                  sectionNumber={sectionNumber}
                  storyNumber={index}
                  leading={remainder === 2 && index === 0}
                  topStory={remainder === 1 && index === 0}
                />
              </StoryPromoLi>
            </Grid>
          ))}
        </MainGridWrapper>
      </StoryPromoUl>
    </MarginWrapper>
  );
};

StoryPromoRenderer.propTypes = {
  items: arrayOf(shape(storyItem)).isRequired,
  firstSection: bool.isRequired,
  sectionNumber: number.isRequired,
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
          firstSection={isFirstSection}
          sectionNumber={sectionNumber}
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

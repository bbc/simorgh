import React, { useContext } from 'react';
import { bool, shape, number } from 'prop-types';
import styled, { css } from 'styled-components';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import SectionLabel from '@bbc/psammead-section-label';
import { StoryPromoUl } from '@bbc/psammead-story-promo-list';
import Grid from '@bbc/psammead-grid';
import { pathOr, dropWhile } from 'ramda';
import UsefulLinksComponent from './UsefulLinks';
import { ServiceContext } from '#contexts/ServiceContext';
import groupShape from '#models/propTypes/frontPageGroup';
import idSanitiser from '#lib/utilities/idSanitiser';
import { getAllowedItems, getRows } from './utilities/storySplitter';
import getRowDetails from './utilities/rowDetails';
import { TopRow } from '../FrontPageStoryRows';

// Apply the right margin-top to the first section of the page when there is one or multiple items.
const FirstSectionTopMargin = styled.div`
  ${({ oneItem }) =>
    oneItem
      ? css`
          @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
            margin-top: ${GEL_SPACING_TRPL};
          }
        `
      : css`
          @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
            margin-top: ${GEL_SPACING};
          }
        `}
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_QUAD};
  }
`;

// Apply the right margin-top between the section label and the promos
const TopMargin = styled.div`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    margin-top: ${GEL_SPACING_DBL};
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

const parentGridColumns = {
  group0: 6,
  group1: 6,
  group2: 6,
  group3: 6,
  group4: 8,
  group5: 8,
};

const renderPromoList = (items, isFirstSection, dir) => {
  // We have a cap on the number of allowed items per section
  const allowedItems = getAllowedItems(items, isFirstSection);
  const rows = getRowDetails(getRows(allowedItems, isFirstSection));

  // Only use StoryPromoUl and Li if there is only one story in one row
  const sectionHasSingleStory =
    rows.length === 1 && rows[0].stories.length === 1;

  const renderedRows = rows.map(row => (
    <row.RowComponent
      key={row.stories[0].id}
      stories={row.stories}
      isFirstSection={isFirstSection}
      displayImages={row.displayImages}
      dir={dir}
      parentColumns={parentGridColumns}
      parentEnableGelGutters
    />
  ));

  return (
    <MarginWrapper
      firstSection={isFirstSection}
      dir={dir}
      oneItem={!!sectionHasSingleStory}
    >
      {sectionHasSingleStory ? (
        <TopRow stories={items} sectionHasSingleStory dir={dir} />
      ) : (
        <Grid
          columns={parentGridColumns}
          enableGelGutters
          dir={dir}
          as={StoryPromoUl}
        >
          {renderedRows}
        </Grid>
      )}
    </MarginWrapper>
  );
};

const sectionBody = (group, items, script, service, isFirstSection, dir) => {
  if (group.semanticGroupName === 'Useful links') {
    return (
      <UsefulLinksComponent items={items} script={script} service={service} />
    );
  }

  return renderPromoList(items, isFirstSection, dir);
};

const removeFirstSlotRadioBulletin = dropWhile(
  item => item.contentType === 'RadioBulletin',
);

const isNotTVBulletin = item => item.contentType !== 'TVBulletin';

const removeTVBulletinsIfNotAVLiveStream = ({ items, type }) =>
  type === 'av-live-streams' ? items : items.filter(isNotTVBulletin);

const FrontPageSection = ({ bar, group, sectionNumber }) => {
  const { script, service, dir, translations } = useContext(ServiceContext);
  const sectionLabelId = idSanitiser(group.title);

  const strapline = pathOr(null, ['strapline', 'name'], group);
  const isLink = pathOr(null, ['strapline', 'type'], group) === 'LINK';
  const href = pathOr(null, ['strapline', 'links', 'mobile'], group);
  const type = pathOr(null, ['type'], group);
  const seeAll = pathOr(null, ['seeAll'], translations);
  const isFirstSection = sectionNumber === 0;

  const updatedItems = removeFirstSlotRadioBulletin(
    pathOr(null, ['items'], group),
  );
  const items = removeTVBulletinsIfNotAVLiveStream({
    items: updatedItems,
    type,
  });

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
      {sectionBody(group, items, script, service, isFirstSection, dir)}
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

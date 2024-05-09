import React, { useContext } from 'react';
import styled from '@emotion/styled';
import makeRelativeUrlPath from '#lib/utilities/makeRelativeUrlPath';
import pathOr from 'ramda/src/pathOr';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '#psammead/gel-foundations/src/spacings';
import SectionLabel from '#psammead/psammead-section-label/src';
import { StoryPromoUl } from '#psammead/psammead-story-promo-list/src';
import Grid from '#components/Grid';
import idSanitiser from '#lib/utilities/idSanitiser';
import { ServiceContext } from '../../../contexts/ServiceContext';
import UsefulLinksComponent from './UsefulLinks';
import {
  getAllowedItems,
  removeFirstSlotRadioBulletin,
  removeTVBulletinsIfNotAVLiveStream,
  removeItemsWithoutUrlOrHeadline,
} from './utilities/filterAllowedItems';
import getRows from './utilities/storyRowsSplitter';
import getRowDetails from './utilities/rowDetails';
import { TopRow } from '../FrontPageStoryRows';

const StyledSection = styled.section`
  /* To centre page layout for Group 4+ */
  margin: 0 auto;
  width: 100%; /* Needed for IE11 */
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

// Apply the right margin-top to the first section of the page when there is one or multiple items.
const FirstSectionTopMargin = styled.div`
  ${({ oneItem }) =>
    oneItem
      ? `
          @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
            margin-top: ${GEL_SPACING_TRPL};
          }
        `
      : `
          @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
            margin-top: ${GEL_SPACING};
          }
        `}
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_QUAD};
  }
`;

// Apply the right margin-top between the section label and the promos
const SpacingDiv = styled.div`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding-top: ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-bottom: ${GEL_SPACING_TRPL};
  }
`;

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
    return <SpacingDiv>{children}</SpacingDiv>;
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

const renderPromos = ({
  items,
  isFirstSection,
  dir,
  showAllPromos,
  labelId,
}) => {
  const rows = getRows({ items, isFirstSection, showAllPromos });
  const rowsDetails = getRowDetails(rows);

  // Don't use StoryPromoUl and Li if there is only one story in one row
  const sectionHasSingleStory =
    rowsDetails.length === 1 && rowsDetails[0].stories.length === 1;

  const renderedRows = rowsDetails.map(row => {
    const key = row.stories[0].id || row.stories[0].uri;
    return (
      <row.RowComponent
        key={key}
        labelId={labelId}
        stories={row.stories}
        isFirstSection={isFirstSection}
        displayImages={row.displayImages}
        dir={dir}
        parentColumns={parentGridColumns}
        parentEnableGelGutters // value is set to true here and passed to each Row component's Grid item
      />
    );
  });

  return (
    <MarginWrapper
      firstSection={isFirstSection}
      dir={dir}
      oneItem={sectionHasSingleStory}
    >
      {sectionHasSingleStory ? (
        <TopRow
          isFirstSection={isFirstSection}
          stories={items}
          dir={dir}
          sectionHasSingleStory
        />
      ) : (
        <Grid columns={parentGridColumns} enableGelGutters as={StoryPromoUl}>
          {renderedRows}
        </Grid>
      )}
    </MarginWrapper>
  );
};

const sectionBody = ({
  group,
  items,
  script,
  service,
  isFirstSection,
  dir,
  showAllPromos,
  labelId,
}) => {
  if (group.semanticGroupName === 'Useful links') {
    return (
      <UsefulLinksComponent items={items} script={script} service={service} />
    );
  }

  return renderPromos({
    items,
    isFirstSection,
    dir,
    showAllPromos,
    labelId,
  });
};

const IndexPageSection = ({
  bar = true,
  group,
  sectionNumber,
  showAllPromos = false,
}) => {
  const { script, service, dir, translations } = useContext(ServiceContext);
  const sectionLabelId = idSanitiser(group.title);
  const { topStoriesTitle } = translations;

  const isLink = pathOr(null, ['strapline', 'type'], group) === 'LINK';
  const href = pathOr(null, ['strapline', 'links', 'mobile'], group);
  const type = pathOr(null, ['type'], group);
  const seeAll = pathOr(null, ['seeAll'], translations);
  const isFirstSection = sectionNumber === 0;
  // If this is the 1st section and the strapline has a name field then it should render a visually hidden text
  // , otherwise render the strapline as it is
  const strapline = isFirstSection
    ? pathOr(topStoriesTitle, ['strapline', 'name'], group)
    : pathOr('', ['strapline', 'name'], group);

  const radioFilteredItems = removeFirstSlotRadioBulletin(
    pathOr(null, ['items'], group),
  );

  const bulletinFilteredItems = removeTVBulletinsIfNotAVLiveStream({
    items: radioFilteredItems,
    type,
  });

  const items = removeItemsWithoutUrlOrHeadline(bulletinFilteredItems);

  // We have a cap on the number of allowed items per section
  const allowedItems = getAllowedItems({
    items,
    isFirstSection,
    showAllPromos,
  });

  // The current implementation of SectionLabel *requires* a strapline to be
  // present in order to render. It is currently *not possible* to render a
  // section that does not have a strapline without breaking both the visual
  // *and especially* the screen reader UX.
  // If this group does not have a strapline; do not render!
  // This may change in the future, if a way to avoid breaking UX is found.
  // Also, don't render a section without any items.
  if (!isFirstSection && !strapline) {
    return null;
  }

  if (!allowedItems || allowedItems.length === 0) {
    return null;
  }

  return (
    // jsx-a11y considers `role="region"` on a <section> to be redundant.
    // (<section> tags *should* imply `role="region"`)
    // While this may be true in a perfect world, we set it in order to get
    // the greatest possible support.
    <StyledSection role="region" aria-labelledby={sectionLabelId}>
      <SectionLabel
        script={script}
        labelId={sectionLabelId}
        bar={bar}
        visuallyHidden={isFirstSection}
        service={service}
        dir={dir}
        linkText={isLink ? seeAll : null}
        href={makeRelativeUrlPath(href)}
      >
        {strapline}
      </SectionLabel>
      {sectionBody({
        group,
        items: allowedItems,
        script,
        service,
        isFirstSection,
        dir,
        showAllPromos,
        labelId: sectionLabelId,
      })}
    </StyledSection>
  );
};

export default IndexPageSection;

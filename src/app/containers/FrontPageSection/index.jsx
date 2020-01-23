import React, { useContext } from 'react';
import { bool, shape, number } from 'prop-types';
import styled, { css } from 'styled-components';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
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
import { StoryPromoUl, StoryPromoLi } from '@bbc/psammead-story-promo-list';
import pathOr from 'ramda/src/pathOr';
import UsefulLinksComponent from './UsefulLinks';
import BulletinContainer from '../Bulletin';
import StoryPromoContainer from '../StoryPromo';
import { ServiceContext } from '#contexts/ServiceContext';
import groupShape from '#models/propTypes/frontPageGroup';
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

const StoryPromoListItem = styled(StoryPromoLi)`
  ${({ isBulletin, isFirstPromo }) =>
    isBulletin &&
    css`
      @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
        ${isFirstPromo
          ? `padding-bottom: ${GEL_SPACING_TRPL};`
          : `padding: ${GEL_SPACING_DBL} 0 ${GEL_SPACING_TRPL};`}
      }
    `}
`;

const isBulletin = item =>
  item.contentType === 'TVBulletin' || item.contentType === 'RadioBulletin';

const renderPromo = (item, index, firstSection) => {
  const topStory = firstSection && index === 0;
  const lazyLoadImage = !topStory; // don't lazy load image if it is a top story
  const promoType = topStory ? 'top' : 'regular';

  if (isBulletin(item)) {
    return <BulletinContainer item={item} lazyLoadImage={lazyLoadImage} />;
  }

  return (
    <StoryPromoContainer
      item={item}
      promoType={promoType}
      lazyLoadImage={lazyLoadImage}
    />
  );
};

const sectionBody = (group, items, script, service, isFirstSection) => {
  if (group.semanticGroupName === 'Useful links') {
    return (
      <UsefulLinksComponent items={items} script={script} service={service} />
    );
  }

  return items.length > 1 ? (
    <MarginWrapper firstSection={isFirstSection}>
      <StoryPromoUl>
        {items.map((item, index) => {
          return (
            <StoryPromoListItem
              key={item.id}
              isFirstPromo={index === 0}
              isBulletin={isBulletin(item)}
            >
              {renderPromo(item, index, isFirstSection)}
            </StoryPromoListItem>
          );
        })}
      </StoryPromoUl>
    </MarginWrapper>
  ) : (
    <MarginWrapper firstSection={isFirstSection} oneItem>
      {renderPromo(items[0], 0, isFirstSection)}
    </MarginWrapper>
  );
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
      {sectionBody(group, items, script, service, isFirstSection)}
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

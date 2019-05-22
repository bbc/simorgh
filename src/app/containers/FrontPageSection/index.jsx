import React, { useContext } from 'react';
import { bool, shape } from 'prop-types';
import SectionLabel from '@bbc/psammead-section-label';
import { StoryPromoUl, StoryPromoLi } from '@bbc/psammead-story-promo-list';
import { ServiceContext } from '../../contexts/ServiceContext';
import StoryPromo from '../StoryPromo';
import groupShape from '../../models/propTypes/frontPageGroup';
import idSanitiser from '../../lib/utilities/idSanitiser';
import deepGet from '../../helpers/json/deepGet';

const FrontPageSection = ({ bar, group }) => {
  const { script } = useContext(ServiceContext);
  const sectionLabelId = idSanitiser(group.title);

  const strapline = deepGet(['strapline', 'name'], group);
  const items = deepGet(['items'], group);

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
      <SectionLabel script={script} labelId={sectionLabelId} bar={bar}>
        {group.strapline.name}
      </SectionLabel>
      <StoryPromoUl>
        {items.map(item => (
          <StoryPromoLi key={item.id}>
            <StoryPromo item={item} script={script} />
          </StoryPromoLi>
        ))}
      </StoryPromoUl>
    </section>
  );
};

FrontPageSection.defaultProps = {
  bar: true,
};

FrontPageSection.propTypes = {
  bar: bool,
  group: shape(groupShape).isRequired,
};

export default FrontPageSection;

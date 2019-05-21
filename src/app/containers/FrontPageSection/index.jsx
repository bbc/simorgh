import React, { useContext } from 'react';
import { shape } from 'prop-types';
import SectionLabel from '@bbc/psammead-section-label';
import { StoryPromoUl, StoryPromoLi } from '@bbc/psammead-story-promo-list';
import { ServiceContext } from '../../contexts/ServiceContext';
import StoryPromo from '../StoryPromo';
import groupShape from '../../models/propTypes/frontPageGroup';
// TODO uncomment the below when bbc/simorgh#1701 is merged; then delete the import below that.
// import idSanitiser from '../../lib/utilities/idSanitiser';
import { sanitise as idSanitiser } from './helpers';

const FrontPageSection = ({ group }) => {
  const { script } = useContext(ServiceContext);
  const sectionLabelId = idSanitiser(group.title);
  return (
    // jsx-a11y considers `role="region"` on a <section> to be redundant.
    // (<section> tags *should* default to `role="region"`)
    // While this may be true in a perfect world, we set it in order to get
    // the greatest possible support.
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <section role="region" aria-labelledby={sectionLabelId}>
      <SectionLabel script={script} labelId={sectionLabelId}>
        {group.strapline.name}
      </SectionLabel>
      <StoryPromoUl>
        {group.items.map(item => (
          <StoryPromoLi key={item.id}>
            <StoryPromo item={item} />
          </StoryPromoLi>
        ))}
      </StoryPromoUl>
    </section>
  );
};

FrontPageSection.propTypes = {
  group: shape(groupShape).isRequired,
};

export default FrontPageSection;

import React from 'react';
import { shape } from 'prop-types';
import { StoryPromoUl, StoryPromoLi } from '@bbc/psammead-story-promo-list';
import StoryPromo from '../StoryPromo';
import groupShape from '../../models/propTypes/frontPageGroup';
import { sanitise } from './helpers';

const FrontPageSection = ({ group }) => {
  // TODO uncomment this when there is a SectionLabel available from Psammead
  // const { script } = useContext(ServiceContext);
  const sectionLabelId = sanitise(group.title);
  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <section role="region" aria-labelledby={sectionLabelId}>
      {/* TODO remove this faux SectionLabel once the real one is available from Psammead */}
      <h2 id={sectionLabelId}>{group.title}</h2>
      {/* TODO uncomment this when there is a SectionLabel available from Psammead */}
      {/* <SectionLabel script={script} labelId={sectionLabelId}>
            {group.strapline.name}
          </SectionLabel> */}
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

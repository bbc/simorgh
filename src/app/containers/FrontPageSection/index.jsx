import React, { useContext } from 'react';
import { shape } from 'prop-types';
import { StoryPromoUl, StoryPromoLi } from '@bbc/psammead-story-promo-list';
import { ServiceContext } from '../../contexts/ServiceContext';
import StoryPromo from '../StoryPromo';
import groupShape from '../../models/propTypes/frontPageGroup';

const FrontPageSection = ({ group }) => {
  // TODO remove this eslint disable when SectionDivider is brought in
  // eslint-disable-next-line no-unused-vars
  const { script } = useContext(ServiceContext);
  return (
    <section>
      {/* <SectionDivider script={script}>{group.strapline.name}</SectionDivider> */}
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

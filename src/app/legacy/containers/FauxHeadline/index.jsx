import React, { use } from 'react';
import path from 'ramda/src/path';
import { Headline } from '#psammead/psammead-headings/src';
import { GridItemLarge } from '#components/Grid';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Fragment from '../Fragment';
import Blocks from '../Blocks';

// missing CSS 'display: block;' in psammead branch `explicitly-set-h1-styles-display-and-font-weight`
const FauxHeadline = props => <Headline as="strong" {...props} />;

const FauxHeadlineContainer = ({
  blocks = [
    {
      model: {
        blocks: [
          {
            model: {},
          },
        ],
      },
    },
  ],
}) => {
  const { script, service } = use(ServiceContext);

  const arrayOfFragments = path(
    ['0', 'model', 'blocks', '0', 'model', 'blocks'],
    blocks,
  );

  if (!arrayOfFragments || !Array.isArray(arrayOfFragments)) {
    return null;
  }
  const componentsToRender = { fragment: Fragment };

  const renderText = () => (
    <Blocks blocks={arrayOfFragments} componentsToRender={componentsToRender} />
  );

  return (
    <GridItemLarge>
      <FauxHeadline script={script} service={service} className="max-group-3:py-full max-group-3:pb-quad group-4:py-double group-4:pb-quin">
        {renderText()}
      </FauxHeadline>
    </GridItemLarge>
  );
};

export default FauxHeadlineContainer;

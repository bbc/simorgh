import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import styled from '@emotion/styled';
import { Headline, SubHeading } from '#psammead/psammead-headings/src';
import idSanitiser from '#lib/utilities/idSanitiser';
import { GridItemMedium, GridItemLarge } from '#components/Grid';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Fragment from '../Fragment';
import InlineContainer from '../InlineContainer';
import Blocks from '../Blocks';

const StyledHeadline = styled(Headline)`
  :focus {
    outline: none;
  }
  overflow-wrap: anywhere;
`;

const Headings = {
  headline: StyledHeadline,
  subheadline: SubHeading,
};

const GridItems = {
  headline: GridItemLarge,
  subheadline: GridItemMedium,
};

const sanitiseSubheadline = (type, text) => {
  if (text && type === 'subheadline') {
    return idSanitiser(text);
  }
  return null;
};

const HeadingsContainer = ({
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
  type,
  className,
}) => {
  const { script, service } = useContext(ServiceContext);
  const Heading = Headings[type];
  const GridItem = GridItems[type];

  const arrayOfFragments = blocks[0].model.blocks[0].model.blocks;
  const isFirstBlock = pathOr(1, ['position', 0])(blocks[0]) === 1;

  if (!arrayOfFragments || !Array.isArray(arrayOfFragments)) {
    return null;
  }
  const { text } = blocks[0].model.blocks[0].model;
  const componentsToRender = { fragment: Fragment, inline: InlineContainer };

  const renderText = () => (
    <Blocks blocks={arrayOfFragments} componentsToRender={componentsToRender} />
  );

  const headingId = isFirstBlock ? 'content' : null; // Used for the skiplink
  const subHeadingId = sanitiseSubheadline(type, text);
  const isHeading = type === 'headline';
  const headingProps = {
    id: isHeading ? headingId : subHeadingId,
    as: isHeading && !isFirstBlock ? 'strong' : null,
    tabIndex: isHeading && !isFirstBlock ? null : '-1',
    className,
  };

  return (
    <GridItem>
      <Heading script={script} service={service} {...headingProps}>
        {renderText()}
      </Heading>
    </GridItem>
  );
};

export default HeadingsContainer;

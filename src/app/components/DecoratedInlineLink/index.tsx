import React, { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import pathOr from 'ramda/src/pathOr';
import Blocks from '#app/legacy/containers/Blocks';
import makeRelativeUrlPath from '#app/lib/utilities/makeRelativeUrlPath';
import { OptimoBlock } from '#app/models/types/optimo';
import fragment from '../Fragment';

const componentsToRender = { fragment };

const DecoratedInlineLink = ({
  locator,
  isExternal,
  blocks,
  onClick,
}: Props) => {
  const { externalLinkText } = use(ServiceContext);

  const linkText = pathOr(null, [0, 'model', 'text'], blocks);

  return (
    <a
      className="text-ebon dark:text-grey-2 border-b border-postbox no-underline visited:text-metal visited:border-metal hover:border-b-2 hover:border-postbox hover:text-postbox focus:border-b-2 focus:border-postbox focus:text-postbox focusIndicatorReducedWidth"
      href={makeRelativeUrlPath(locator)}
      {...(isExternal
        ? { 'aria-label': `${linkText}${externalLinkText}` }
        : {})}
      {...(onClick ? { onClick } : {})}
    >
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </a>
  );
};

type Props = {
  locator: string;
  isExternal: boolean;
  blocks: OptimoBlock[];
  onClick?: (event: React.MouseEvent) => void;
};

export default DecoratedInlineLink;

import type { MouseEvent } from 'react';
import { use } from 'react';
import pathOr from 'ramda/src/pathOr';

import { ServiceContext } from '#app/contexts/ServiceContext';
import Blocks from '#app/legacy/containers/Blocks';
import makeRelativeUrlPath from '#app/lib/utilities/makeRelativeUrlPath';
import type { OptimoBlock } from '#app/models/types/optimo';
import fragment from '../Fragment';
import styles from './index.style';

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
      css={styles.InlineLink}
      href={makeRelativeUrlPath(locator)}
      className="focusIndicatorReducedWidth"
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
  onClick?: (event: MouseEvent) => void;
};

export default DecoratedInlineLink;

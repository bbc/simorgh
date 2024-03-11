/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useContext } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import pathOr from 'ramda/src/pathOr';
import Blocks from '#app/legacy/containers/Blocks';
import makeRelativeUrlPath from '#app/lib/utilities/makeRelativeUrlPath';
import { OptimoBlock } from '#app/models/types/optimo';
import styles from './index.style';
import fragment from '../Fragment';

const componentsToRender = { fragment };

const DecoratedInlineLink = ({
  locator,
  isExternal,
  blocks,
  onClick,
}: Props) => {
  const { externalLinkText } = useContext(ServiceContext);

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
  onClick?: (event: React.MouseEvent) => void;
};

export default DecoratedInlineLink;

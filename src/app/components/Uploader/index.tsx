/** @jsxRuntime classic */
/** @jsx jsx */
import React, { PropsWithChildren } from 'react';
import path from 'ramda/src/path';
import { jsx } from '@emotion/react';
import Text from '../Text';
// import uploaderBlockPropTypes from '../../models/propTypes/uploader';

type Props = {
  blocks: object[];
};

const Uploader = ({ blocks, children }: PropsWithChildren<Props>) => {
  const type = path([0, 'type'], blocks);
  const uploaderBlocks = path([0, 'model', 'blocks'], blocks);

  const titleContent = path(
    [0, 'model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
    uploaderBlocks,
  );

  const textContent = path(
    [1, 'model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
    uploaderBlocks,
  );

  const linkContent = path(
    [2, 'model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
    uploaderBlocks,
  );

  return (
    <section>
      <p>{type as string}</p>
      <p>{titleContent as string}</p>
      <p>{textContent as string}</p>
      <p>{linkContent as string}</p>
    </section>
  );
};

Uploader.defaultProps = {
  children: null,
};

export default Uploader;

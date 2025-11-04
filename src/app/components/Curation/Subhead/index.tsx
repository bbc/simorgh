/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { PropsWithChildren, use } from 'react';

import styles from './index.styles';

import { LeftChevron, RightChevron } from '../../icons';

import { ServiceContext } from '../../../contexts/ServiceContext';

interface Props {
  link?: string;
  id?: string;
  [key: string]: unknown;
}

const Subhead = ({
  children,
  link,
  id,
  ...curationSubheadingClickTracker
}: PropsWithChildren<Props>) => {
  const { dir } = use(ServiceContext);

  return (
    <h2 css={styles.h2} id={id}>
      {link ? (
        <a
          href={link}
          className="focusIndicatorDisplayBlock"
          {...curationSubheadingClickTracker}
        >
          <span>{children}</span>
          {dir === 'ltr' ? <RightChevron /> : <LeftChevron />}
        </a>
      ) : (
        <React.Fragment>{children}</React.Fragment>
      )}
    </h2>
  );
};

export default Subhead;

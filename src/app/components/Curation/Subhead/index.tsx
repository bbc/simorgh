import React, { Fragment, PropsWithChildren, use, useContext } from 'react';
import styles from './index.module.scss';
import { LeftChevron, RightChevron } from '../../icons';

import { ServiceContext } from '../../../contexts/ServiceContext';

console.log('Subhead styles:', styles);

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
  // useContext(ThemeContext);
  // theme is now available for use in this component
  const Wrapper = link
    ? ({ children: innerChildren }: PropsWithChildren<Props>) => (
        <a
          href={link}
          className="focusIndicatorDisplayBlock"
          {...curationSubheadingClickTracker}
        >
          <span>{innerChildren}</span>
          {dir === 'ltr' ? <RightChevron /> : <LeftChevron />}
        </a>
      )
    : Fragment;
  return (
    <h2 className={styles.h2} id={id}>
      <Wrapper>{children}</Wrapper>
    </h2>
  );
};

export default Subhead;

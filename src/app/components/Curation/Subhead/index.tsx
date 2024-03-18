/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Fragment, PropsWithChildren, useContext } from 'react';

import styles from './index.styles';

import { LeftChevron, RightChevron } from '../../icons';

import { ServiceContext } from '../../../contexts/ServiceContext';

interface Props {
  link?: string;
  id?: string;
}

const Subhead = ({ children, link, id }: PropsWithChildren<Props>) => {
  const { dir } = useContext(ServiceContext);

  const Wrapper = link
    ? ({ children: innerChildren }: PropsWithChildren<Props>) => (
        <a href={link} className="focusIndicatorDisplayBlock">
          <span>{innerChildren}</span>
          {dir === 'ltr' ? <RightChevron /> : <LeftChevron />}
        </a>
      )
    : Fragment;
  return (
    <h2 css={styles.h2} id={id}>
      <Wrapper>{children}</Wrapper>
    </h2>
  );
};

export default Subhead;

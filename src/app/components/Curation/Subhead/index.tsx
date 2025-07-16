import { Fragment, PropsWithChildren, use } from 'react';

import styles from './index.module.css';

import { LeftChevron, RightChevron } from '../../icons';

import { ServiceContext } from '../../../contexts/ServiceContext';

interface Props {
  link?: string;
  id?: string;
}

const Subhead = ({ children, link, id }: PropsWithChildren<Props>) => {
  const { dir } = use(ServiceContext);

  const Wrapper = link
    ? ({ children: innerChildren }: PropsWithChildren<Props>) => (
        <a href={link} className="focusIndicatorDisplayBlock">
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

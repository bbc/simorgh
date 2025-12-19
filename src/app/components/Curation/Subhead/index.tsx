import { Fragment, PropsWithChildren, use } from 'react';

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
    <h2 css={styles.h2} id={id}>
      <Wrapper>{children}</Wrapper>
    </h2>
  );
};

export default Subhead;

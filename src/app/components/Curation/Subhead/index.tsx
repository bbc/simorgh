/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Fragment, PropsWithChildren } from 'react';
import CallToActionLink from '#app/components/CallToActionLink';

import styles from './index.styles';

interface Props {
  link?: string;
  id?: string;
}

const Subhead = ({ children, link, id }: PropsWithChildren<Props>) => {
  const Wrapper = link
    ? ({ children: innerChildren }: PropsWithChildren<Props>) => (
        <CallToActionLink
          url={link}
          size="doublePica"
          className="focusIndicatorDisplayBlock"
          alignWithMargin
        >
          <CallToActionLink.Text shouldUnderlineOnHoverFocus>
            {innerChildren}
          </CallToActionLink.Text>
          <CallToActionLink.Chevron css={styles.chevronStyles} />
        </CallToActionLink>
      )
    : Fragment;
  return (
    <h2 css={styles.h2} id={id}>
      <Wrapper>{children}</Wrapper>
    </h2>
  );
};

export default Subhead;

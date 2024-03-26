/** @jsx jsx */
import { jsx } from '@emotion/react';
import { FooterLink } from '#app/models/types/serviceConfig';
import { ReactElement } from 'react';
import Link from '../Link';
import styles, { gridTemplateRows } from './index.styles';

export default ({
  elements = [],
  trustProjectLink,
}: {
  elements?: (ReactElement | null)[];
  trustProjectLink?: FooterLink;
}) => {
  return (
    <ul
      role="list"
      css={[
        styles.list,
        trustProjectLink
          ? [
              styles.listPaddingWithTrustProjectLink,
              styles.listItemWithBottomBorder,
            ]
          : styles.listPaddingWithoutTrustProjectLink,
        gridTemplateRows({
          itemCount: elements.length,
          trustProjectLink,
        }),
      ]}
    >
      {trustProjectLink && (
        <li css={styles.listItem}>
          <Link text={trustProjectLink.text} href={trustProjectLink.href} />
        </li>
      )}
      {elements.map((elem, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={index} role="listitem">
          {elem}
        </li>
      ))}
    </ul>
  );
};

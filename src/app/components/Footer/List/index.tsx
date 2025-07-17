import { FooterLink } from '#app/models/types/serviceConfig';
import { ReactElement } from 'react';
import Link from '../Link';
import styles from './index.module.css';

export default ({
  elements = [],
  trustProjectLink,
  extraLinks,
}: {
  elements?: (ReactElement | null)[];
  trustProjectLink?: FooterLink;
  extraLinks?: boolean;
}) => {
  return (
    <ul
      role="list"
      className={[
        styles.list,
        trustProjectLink
          ? [
              styles.listPaddingWithTrustProjectLink,
              styles.listItemWithBottomBorder,
            ].join(' ')
          : styles.listPaddingWithoutTrustProjectLink,
        extraLinks && styles.listExtraLinks,
      ].filter(Boolean).join(' ')}
    >
      {trustProjectLink && (
        <li className={styles.listItem}>
          <Link text={trustProjectLink.text} href={trustProjectLink.href} />
        </li>
      )}
      {elements.map((elem, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={index}>{elem}</li>
      ))}
    </ul>
  );
};

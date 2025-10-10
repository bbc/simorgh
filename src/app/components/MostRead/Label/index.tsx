/** @jsx jsx */
import { use } from 'react';
import { jsx } from '@emotion/react';
import styles from './index.styles';
import SectionLabel from '../../../legacy/psammead/psammead-section-label/src';
import { GREY_2 } from '../../ThemeProvider/palette';
import { ServiceContext } from '../../../contexts/ServiceContext';

interface MostReadSectionLabelProps {
  mobileDivider?: boolean;
  backgroundColor?: string;
  href?: string;
  linkText?: string;
  visuallyHidden?: boolean;
  overrideHeadingAs?: string;
}

const MostReadSectionLabel = ({
  mobileDivider = true,
  backgroundColor = GREY_2,
  href,
  linkText,
  visuallyHidden,
  overrideHeadingAs,
}: MostReadSectionLabelProps) => {
  const {
    dir,
    mostRead: { header },
  } = use(ServiceContext);
  return (
    <SectionLabel
      css={styles.sectionLabel}
      labelId="Most-Read"
      dir={dir}
      mobileDivider={mobileDivider}
      backgroundColor={backgroundColor}
      href={href}
      linkText={linkText}
      visuallyHidden={visuallyHidden}
      overrideHeadingAs={overrideHeadingAs}
    >
      {header}
    </SectionLabel>
  );
};

export default MostReadSectionLabel;

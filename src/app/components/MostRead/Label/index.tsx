/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
import SectionLabel from '#legacy/psammead/psammead-section-label/src';
import { GREY_2 } from '#components/ThemeProvider/palette';
import { ServiceContext } from '#contexts/ServiceContext';
import styles from './index.styles';

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
    service,
    script,
    dir,
    mostRead: { header },
  } = useContext(ServiceContext);
  return (
    <SectionLabel
      css={styles.sectionLabel}
      script={script}
      labelId="Most-Read"
      service={service}
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

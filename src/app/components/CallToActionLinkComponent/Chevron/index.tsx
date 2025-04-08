/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { LeftChevron, RightChevron } from '../../icons';
import { GelFontSize } from '../../../models/types/theming';
import styles from './index.styles';

type ChevronProps = {
  size?: GelFontSize;
};

const getChevronCss = (size: GelFontSize) => {
  const chevronCss = [];

  if (size === 'brevier') {
    chevronCss.push(styles.brevierSize);
  } else {
    chevronCss.push(styles.picaSize);
  }

  chevronCss.push(styles.chevron);

  return chevronCss;
};

const Chevron = ({ size = 'pica' }: ChevronProps) => {
  const { dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';
  return isRtl ? (
    <LeftChevron css={getChevronCss(size)} />
  ) : (
    <RightChevron css={getChevronCss(size)} />
  );
};

export default Chevron;

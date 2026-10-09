import { SerializedStyles, Theme } from '@emotion/react';
import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { LeftChevron, RightChevron } from '../../icons';
import CallToActionLinkContext from '../CallToActionLinkContext';
import styles from './index.styles';

type ChevronProps = {
  className?: string;
};

const getChevronCss = (size = 'pica') => {
  const chevronCss: Array<(_theme: Theme) => SerializedStyles> = [];

  if (size === 'brevier') {
    chevronCss.push(styles.brevierSize);
  } else {
    chevronCss.push(styles.picaSize);
  }

  chevronCss.push(styles.chevron);

  return chevronCss;
};

const Chevron = ({ className }: ChevronProps) => {
  const { size } = use(CallToActionLinkContext);
  const { dir } = use(ServiceContext);
  const isRtl = dir === 'rtl';
  return isRtl ? (
    <LeftChevron className={className} css={getChevronCss(size)} />
  ) : (
    <RightChevron className={className} css={getChevronCss(size)} />
  );
};

export default Chevron;

import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { LeftChevron, RightChevron } from '../../icons';
import CallToActionLinkContext from '../CallToActionLinkContext';
import styles from './index.module.css';

type ChevronProps = {
  className?: string;
};

const getChevronCss = (size = 'pica') => {
  const chevronCss = [];

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
  const chevronClasses = [className, ...getChevronCss(size)].filter(Boolean).join(' ');
  
  return isRtl ? (
    <LeftChevron className={chevronClasses} />
  ) : (
    <RightChevron className={chevronClasses} />
  );
};

export default Chevron;

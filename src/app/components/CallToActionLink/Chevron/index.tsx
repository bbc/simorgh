import React, { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { LeftChevron, RightChevron } from '../../icons';
import CallToActionLinkContext from '../CallToActionLinkContext';

type ChevronProps = {
  className?: string;
};

const getChevronClasses = (size = 'pica') => {
  const baseClasses = 'align-middle fill-current';
  if (size === 'brevier') {
    return `${baseClasses} ml-full w-[0.875rem] h-[0.875rem]`;
  }
  return `${baseClasses} ml-full w-double h-double`;
};

const Chevron = ({ className }: ChevronProps) => {
  const { size } = use(CallToActionLinkContext);
  const { dir } = use(ServiceContext);
  const isRtl = dir === 'rtl';
  
  const chevronClasses = getChevronClasses(size);
  
  return isRtl ? (
    <LeftChevron className={`${className} ${chevronClasses}`} />
  ) : (
    <RightChevron className={`${className} ${chevronClasses}`} />
  );
};

export default Chevron;

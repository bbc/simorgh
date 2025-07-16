const styles = {
  promoWrapper: 'mb-full mt-full h-full gel-3-only:mb-0 gel-3-only:mt-0',
  textWrapper: (isLite: boolean) => 
    `w-2/3 inline-block align-top ps-2 gel-3-only:w-full ${isLite ? 'w-full' : ''}`,
  promoTitle: 'text-pica gel-3-only:mt-3',
  imageWrapper: 'w-1/3 inline-block align-top gel-3-only:w-full',
  promoLink: 'text-grey-2 visited:text-grey-5',
  promoStyle: 'bg-transparent',
  timeStamp: 'pt-full',
};

export default styles;

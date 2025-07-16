const commonMarginSpacing = 'mx-full gel-2:gel-3-max:mx-double gel-4:mx-0';

export default {
  pageWrapper: 'bg-grey-2',
  grid: 'max-w-gel-1008 mx-auto grid grid-cols-12 gel-4:p-4 gel-4:gap-4',
  primaryColumn: 'col-span-12 pb-8 gel-4:col-span-8',
  secondaryColumn: 'col-span-12 gel-4:col-span-4 gel-4:col-start-9 gel-4:mt-8',
  pglColumn: 'col-span-12 pb-8',
  mainContent: 'pb-triple [&_.continueReadingFocusedElement]:outline-[0.1875rem] [&_.continueReadingFocusedElement]:outline-black [&_.continueReadingFocusedElement]:shadow-[0_0_0_0.1875rem_white] [&_.continueReadingFocusedElement]:outline-offset-[0.1875rem]',
  contentHidden: (liteCTAShows: boolean) => 
    `${liteCTAShows ? '[&>*:nth-child(n+9):not(button)]:hidden' : '[&>*:nth-child(n+8):not(button)]:hidden'} [&>*:nth-child(n+9):not(button)]:no-js:block [&>*:nth-child(n+8):not(button)]:no-js:block [&>*:nth-child(n+9):not(button)]:gel-4:block [&>*:nth-child(n+8):not(button)]:gel-4:block`,
  hideRelatedTopics: 'hidden',
  adContainer: 'mb-triple',
  mostReadSection: 'gel-1-max:mx-full gel-1-max:pb-triple gel-2:gel-3-max:mx-double gel-2:gel-3-max:pb-quadruple gel-4-only:mx-double gel-4-only:pb-quintuple gel-5:mx-auto gel-5:p-double gel-5:pt-0 gel-5:pb-triple gel-5:max-w-gel-1280',
  relatedTopics: 'mx-double pb-full gel-4:mx-0 gel-4:my-quadruple gel-4:pb-quadruple',
  featuresSection: 'mb-triple gel-4:mb-full gel-4:p-double',
  topStoriesSection: 'mb-triple gel-4:mb-full gel-4:p-double',
  portraitVideoTitle: `block text-double-pica font-sans-bold pb-double text-black gel-2-only:pb-triple gel-3:pb-double ${commonMarginSpacing}`,
};

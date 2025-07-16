export default {
  pageWrapper: (isDarkUi: boolean) => isDarkUi ? 'bg-grey-10' : 'bg-grey-2',
  grid: 'max-w-gel-1008 mx-auto grid grid-cols-12 gel-4:p-4 gel-4:gap-4',
  primaryColumn: 'col-span-12 pb-8 gel-4:col-span-8',
  secondaryColumn: 'col-span-12 gel-4:col-span-4 gel-4:col-start-9 gel-4:mt-8',
  fullWidthContainer: 'col-span-12 pb-8',
  mainContent: 'pb-triple',
  cafMediaPlayer: 'gel-3-only:p-triple gel-3-only:pt-0',
  portraitVideoPlayer: 'pt-0 pb-triple max-w-full mx-0 my-0 gel-3-only:pt-double gel-3-only:mx-double gel-3-only:max-w-[20.3125rem] gel-3:gel-3-max:pt-double gel-3:gel-3-max:mx-double gel-3:pb-triple gel-4:pt-triple [&_.portrait-media-loader]:max-w-full [&_.portrait-media-loader]:mx-0 [&_.portrait-media-loader]:my-0 gel-3-only:[&_.portrait-media-loader]:max-w-[20.3125rem] gel-4-only:[&_.portrait-media-loader]:max-w-[19.6875rem] gel-5:[&_.portrait-media-loader]:max-w-[24.8125rem] [&_.portrait-caption]:mx-full gel-2:[&_.portrait-caption]:mx-double gel-3:[&_.portrait-caption]:mx-0',
  mostReadSection: 'gel-1-max:mx-full gel-1-max:pb-triple gel-2:gel-3-max:mx-double gel-2:gel-3-max:pb-quadruple gel-4-only:mx-double gel-4-only:pb-quintuple gel-5:mx-auto gel-5:p-double gel-5:pt-0 gel-5:pb-triple gel-5:max-w-gel-1280',
  relatedTopics: 'mx-double pb-full gel-4:mx-0 gel-4:my-quadruple gel-4:pb-quadruple',
  topStoriesAndFeaturesSection: 'mb-triple gel-4:mb-full gel-4:p-double',
  responsiveComponentWrapper: 'mb-triple gel-4:mb-full',
};

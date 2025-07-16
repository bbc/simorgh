const showOnDemandImage = '22.4375rem';

export default {
  grid: 'max-w-gel-1008 mx-auto grid grid-cols-6 gap-x-full gel-3:gap-x-double gel-4:grid-cols-8 gel-5:max-w-gel-1280 gel-5:grid-cols-20',
  contentWrapper: 'col-span-6 px-full gel-2:px-double gel-4:col-span-6 gel-4:col-start-2 gel-4:px-0 gel-5:col-span-12 gel-5:col-start-5',
  flexWrapper: 'flex flex-row-reverse gel-4:pt-triple',
  text: (isLite: boolean) => `flex-[7_1_0] ${isLite ? 'pb-triple' : ''}`,
  image: `hidden [${showOnDemandImage}]:block [${showOnDemandImage}]:flex-[3_1_0] [${showOnDemandImage}]:me-full gel-3:me-double`,
  aside: 'inline-block w-full',
};

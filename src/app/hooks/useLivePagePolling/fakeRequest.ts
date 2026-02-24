import { ComponentProps } from '#nextjs/pages/[service]/live/[id]/LivePageLayout';
import pageData2 from './tempPageData2';

export default () => {
  console.log('CHECK UPDATE');
  return pageData2 as unknown as ComponentProps['pageData'];
};

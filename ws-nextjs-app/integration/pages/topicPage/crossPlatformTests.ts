import { runCommonCrossPlatformTests } from '../../common';
import pageContentTests from './pageContentTests';

export default service => {
  runCommonCrossPlatformTests(service);
  pageContentTests();
};

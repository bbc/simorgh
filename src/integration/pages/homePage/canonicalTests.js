import { runCoreCanonicalTests } from '../../common';
import runCrossPlatformTests from './crossPlatformTests';
import mostReadTests from './mostReadTests';

export default ({ service, pageData }) => {
  runCrossPlatformTests({ service, pageData });
  runCoreCanonicalTests();
  mostReadTests();
};

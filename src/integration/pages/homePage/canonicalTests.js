import { runCoreCanonicalTests } from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default ({ service, pageData }) => {
  runCrossPlatformTests({ service, pageData });
  runCoreCanonicalTests();
};

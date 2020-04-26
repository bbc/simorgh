import runCrossPlatformTests from './crossPlatformTests';
import { runCoreAmpTests } from '../../common';

export default () => {
  runCrossPlatformTests();
  runCoreAmpTests();
};

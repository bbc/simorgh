import { runCoreAmpTests } from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default (service: string) => {
  runCrossPlatformTests(service);
  runCoreAmpTests();
};

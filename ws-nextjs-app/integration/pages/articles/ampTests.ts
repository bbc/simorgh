import { Services } from '#app/models/types/global';
import { runCoreAmpTests } from '#src/integration/common';
import runCrossPlatformTests from './crossPlatformTests';

export default (service: Services) => {
  runCrossPlatformTests(service);
  runCoreAmpTests();
};

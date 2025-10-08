import {
  runCommonCrossPlatformTests,
  runTimestampTests,
  runImageTests,
} from '#src/integration/common';
import { Services } from '#app/models/types/global';

export default (service: Services) => {
  runCommonCrossPlatformTests(service);
  runTimestampTests();
  runImageTests();
};

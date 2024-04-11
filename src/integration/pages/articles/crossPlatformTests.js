import {
  runCommonCrossPlatformTests,
  runTimestampTests,
  runImageTests,
  runMostReadTests,
  runParagraphTests,
} from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);
  runTimestampTests();
  runImageTests();
  runParagraphTests();

  if (service !== 'scotland') {
    runMostReadTests();
  }
};

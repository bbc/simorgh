import {
  runCommonCrossPlatformTests,
  runTimestampTests,
  runImageTests,
  runMostReadTests,
  runParagraphTests,
  runInlineLinkTests,
} from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);
  runTimestampTests();
  runImageTests();
  runParagraphTests();
  runInlineLinkTests();

  if (service !== 'scotland') {
    runMostReadTests();
  }
};

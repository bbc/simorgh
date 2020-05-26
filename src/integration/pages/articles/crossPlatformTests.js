import {
  runCommonCrossPlatformTests,
  runImageWithCaptionTests,
  runHeadlineTests,
} from '../../common';

export default () => {
  runCommonCrossPlatformTests();
  runHeadlineTests();

  // These service's urls don't have images with captions. Need to find better examples
  if (!['zhongwen', 'uzbek', 'serbian', 'ukchina'].includes(service)) {
    runImageWithCaptionTests();
  }
};

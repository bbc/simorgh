import {
  runHeaderTests,
  runMediaPlayerEmbedTests,
} from '../../../../src/integration/common';

export default () => {
  runHeaderTests();
  runMediaPlayerEmbedTests();
};

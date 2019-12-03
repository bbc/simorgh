import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';

import Metadata from './Metadata';

describe('MediaPlayer', () => {
  shouldMatchSnapshot('should render Metadata correctly ', Metadata);
});

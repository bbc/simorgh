import AmpImg from './index.amp';
import snapshotTests from './testHelpers/snapshotTests';

describe('Image - AmpImg', () => {
  const additionalProps = {
    layout: 'responsive',
  };

  snapshotTests(AmpImg, additionalProps);
});

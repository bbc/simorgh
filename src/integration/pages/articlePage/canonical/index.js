import runCommonCanonicalTests from './common';
import runUserTests from './user';

export default () => {
  describe('When I am on canonical', () => {
    runCommonCanonicalTests();
    runUserTests({
      imageAltText: 'Comrade Adams Oshiomole',
      imageCaptionText:
        'APC Chairman Adams Oshiomhole don be Govnor of Edo State before',
    });
  });
};

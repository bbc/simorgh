import { testContentType } from '../support/metaTestHelper';
import describeForLocalOnly from '../support/describeForLocalOnly';

describeForLocalOnly('Service worker', () => {
  it('should have the content type set to Javascript', () => {
    testContentType(
      '/news/articles/sw.js',
      'application/javascript; charset=UTF-8',
    );
  });
});

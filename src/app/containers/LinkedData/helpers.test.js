import { cleanLinkedData } from './helpers';

describe('Clean Linked Data', () => {
  it('should not have publisher or thumbnailUrl in linked data for RadioChannel', () => {
    const linkedData = {
      '@type': 'RadioChannel',
      url: 'mock-url',
      headline: 'headline',
      publisher: { name: 'Joe Roe' },
      thumbnailUrl: 'another-mock-url',
    };
    const expectedData = {
      '@type': 'RadioChannel',
      url: 'mock-url',
      headline: 'headline',
    };
    const actualData = cleanLinkedData(linkedData);
    expect(actualData).toEqual(expectedData);
  });

  it('should not change linked data for other channel types', () => {
    const linkedData = {
      '@type': 'WebPage',
      url: 'mock-url',
      headline: 'headline',
      publisher: { name: 'Joe Roe' },
      thumbnailUrl: 'another-mock-url',
    };
    const actualData = cleanLinkedData(linkedData);
    expect(actualData).toEqual(linkedData);
  });
});

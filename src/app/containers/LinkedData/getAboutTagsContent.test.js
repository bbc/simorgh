import getAboutTagsContent from './getAboutTagsContent';

it('returns undefined if no about tags are provided', () => {
  const aboutTags = [];
  expect(getAboutTagsContent(aboutTags)).toEqual(undefined);
});

it('returns the accepted type if one is present', () => {
  const aboutTags = [
    {
      thingLabel: 'Kate Middleton',
      thingType: ['core:Person', 'core:Thing'],
    },
  ];

  const expected = [
    {
      '@type': 'Person',
      name: 'Kate Middleton',
    },
  ];
  expect(getAboutTagsContent(aboutTags)).toEqual(expected);
});

it('returns Thing if no types are present', () => {
  const aboutTags = [
    {
      thingLabel: 'Kate Middleton',
      thingType: [],
    },
  ];

  const expected = [
    {
      '@type': 'Thing',
      name: 'Kate Middleton',
    },
  ];
  expect(getAboutTagsContent(aboutTags)).toEqual(expected);
});
it('return Thing if more that one accepted tag is present', () => {
  const aboutTags = [
    {
      thingLabel: 'Kate Middleton',
      thingType: ['core:Person', 'core:Thing', 'core:Place'],
    },
  ];

  const expected = [
    {
      '@type': 'Thing',
      name: 'Kate Middleton',
    },
  ];
  expect(getAboutTagsContent(aboutTags)).toEqual(expected);
});

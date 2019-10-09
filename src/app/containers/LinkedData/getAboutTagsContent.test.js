import getAboutTagsContent from './getAboutTagsContent';

it('returns expected object when given correct tags', () => {
  const aboutTags = [
    {
      thingId: '6ef8f9fc-237c-4b1f-843b-908a89d34a0e',
      thingLabel: 'Kate Middleton',
      thingSameAs: [
        'http://dbpedia.org/resource/Catherine%2C_Duchess_of_Cambridge',
        'http://rdf.freebase.com/ns/m.05mnc3',
        'http://www.wikidata.org/entity/Q10479',
      ],
      thingType: ['Person', 'Thing'],
      thingUri:
        'http://www.bbc.co.uk/things/6ef8f9fc-237c-4b1f-843b-908a89d34a0e#id',
    },
    {
      thingId: '2351f2b2-ce36-4f44-996d-c3c4f7f90eaa',
      thingLabel: 'Wedding of Prince Harry and Meghan Markle',
      thingSameAs: [],
      thingType: ['Event', 'Thing'],
      thingUri:
        'http://www.bbc.co.uk/things/2351f2b2-ce36-4f44-996d-c3c4f7f90eaa#id',
      'skos:altLabel': 'Test skos:altLabel',
    },
    {
      thingId: '2351f2b2-ce36-4f44-996d-c3c4f7f90eaa',
      thingLabel: 'Wedding of Prince Harry and Meghan Markle',
      thingSameAs: ['http://rdf.freebase.com/ns/m.05mnc3'],
      thingType: ['Not an acceptable type'],
      thingUri:
        'http://www.bbc.co.uk/things/2351f2b2-ce36-4f44-996d-c3c4f7f90eaa#id',
      'skos:altLabel': 'Test skos:altLabel',
    },
  ];
  const expected = [
    {
      '@type': 'Thing',
      name: 'Kate Middleton',
      sameAs: ['http://dbpedia.org/resource/Catherine%2C_Duchess_of_Cambridge'],
    },
    {
      '@type': 'Thing',
      name: 'Wedding of Prince Harry and Meghan Markle',
      alternateName: 'Test skos:altLabel',
    },
    {
      '@type': 'Thing',
      alternateName: 'Test skos:altLabel',
      name: 'Wedding of Prince Harry and Meghan Markle',
      sameAs: undefined,
    },
  ];

  expect(getAboutTagsContent(aboutTags)).toEqual(expected);
});

it('returns undefined if no about tags are provided', () => {
  const aboutTags = [];
  expect(getAboutTagsContent(aboutTags)).toEqual(undefined);
});

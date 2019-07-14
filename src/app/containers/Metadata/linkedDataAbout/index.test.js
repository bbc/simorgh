import aboutTagsContent, { checkType, checkSameAs } from '.';

describe('linkedDataAbout', () => {
  describe('checkType', () => {
    it('only returns acceptable types', () => {
      const types = ['Animal'];
      expect(checkType(types)).toEqual('Thing');
    });

    it('returns Thing when provided with multiple types', () => {
      const types = ['Animal', 'Place', 'Event'];
      expect(checkType(types)).toEqual('Thing');
    });

    it('returns Thing when no type is provided', () => {
      const types = [];
      expect(checkType(types)).toEqual('Thing');
    });

    it('returns acceptable type, when one is provided', () => {
      const types = ['Place'];
      expect(checkType(types)).toEqual('Place');
    });
  });

  describe('checkSameAs', () => {
    it('only returns uris from dbpedia.org domain', () => {
      const uri = [
        'http://rdf.freebase.com/',
        'http://dbpedia.org/resource/Catherine',
      ];
      const expected = ['http://dbpedia.org/resource/Catherine'];
      expect(checkSameAs(uri)).toEqual(expected);
    });

    it('returns undefined if no uri with dbpedia.org domain provided', () => {
      const uri = ['http://rdf.freebase.com/'];
      expect(checkSameAs(uri)).toEqual(undefined);
    });
  });

  describe('aboutTagsContent', () => {
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
      ];
      const expected = [
        {
          '@type': 'Thing',
          name: 'Kate Middleton',
          sameAs: [
            'http://dbpedia.org/resource/Catherine%2C_Duchess_of_Cambridge',
          ],
        },
        {
          '@type': 'Thing',
          name: 'Wedding of Prince Harry and Meghan Markle',
          alternateName: 'Test skos:altLabel',
        },
      ];

      expect(aboutTagsContent(aboutTags)).toEqual(expected);
    });

    it('returns undefined if no about tags are provided', () => {
      const aboutTags = [];
      expect(aboutTagsContent(aboutTags)).toEqual(undefined);
    });
  });
});

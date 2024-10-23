import { clone } from 'rambda';
import categoryName from '.';
import {
  passportTaggings,
  passportPredicatesFormats,
} from '../../../../pages/ArticlePage/fixtureData';

describe('categoryName', () => {
  it('should return NewsArticle when a service is not a Trust Project participant', () => {
    const schemaDotOrgType = categoryName(
      false,
      passportTaggings,
      passportPredicatesFormats,
    );

    expect(schemaDotOrgType).toEqual('NewsArticle');
  });

  it('should return NewsArticle when http://www.bbc.co.uk/ontologies/creativework/format is not present in passport taggings', () => {
    const taggingsWithoutCreativeFormat = clone(passportTaggings);

    taggingsWithoutCreativeFormat.shift();

    const schemaDotOrgType = categoryName(
      true,
      taggingsWithoutCreativeFormat,
      passportPredicatesFormats,
    );

    expect(schemaDotOrgType).toEqual('NewsArticle');
  });

  it('should return NewsArticle when there is more than one passport predicates formats', () => {
    const schemaDotOrgType = categoryName(true, passportTaggings, [
      {
        value:
          'http://www.bbc.co.uk/things/46c0517d-9927-4d1a-9954-8c63a3f7a888#id',
        thingLabel: 'News report',
        thingUri:
          'http://www.bbc.co.uk/things/46c0517d-9927-4d1a-9954-8c63a3f7a888#id',
        thingId: '46c0517d-9927-4d1a-9954-8c63a3f7a888',
        thingType: ['tagging:TagConcept', 'tagging:Format'],
        thingSameAs: [],
        thingEnglishLabel: 'Report',
        thingPreferredLabel: 'Report',
        thingLabelLanguage: 'es',
        type: 'formats',
      },
      ...passportPredicatesFormats,
    ]);

    expect(schemaDotOrgType).toEqual('NewsArticle');
  });

  test.each([[[]], [undefined]])(
    'should return NewsArticle when taggings are not present',
    taggings => {
      const schemaDotOrgType = categoryName(
        true,
        taggings,
        passportPredicatesFormats,
      );

      expect(schemaDotOrgType).toEqual('NewsArticle');
    },
  );

  test.each([[[]], [undefined]])(
    'should return NewsArticle when predicates formats are not present',
    predicatesFormats => {
      const schemaDotOrgType = categoryName(
        true,
        passportTaggings,
        predicatesFormats,
      );

      expect(schemaDotOrgType).toEqual('NewsArticle');
    },
  );

  test.each([
    [
      'http://www.bbc.co.uk/things/170f311e-fd87-4255-85db-8b4aee12594d#id',
      'AnalysisNewsArticle',
    ],
    [
      'http://www.bbc.co.uk/things/bb3ead7c-eb94-453b-b9de-34a59aba2fbf#id',
      'BackgroundNewsArticle',
    ],
    [
      'http://www.bbc.co.uk/things/654e1609-7a9f-470a-bd87-fb8e8144c374#id',
      'OpinionNewsArticle',
    ],
    [
      'http://www.bbc.co.uk/things/46c0517d-9927-4d1a-9954-8c63a3f7a888#id',
      'ReportageNewsArticle',
    ],
    [
      'http://www.bbc.co.uk/things/8d1509ef-08ef-42bd-b831-82504eed9b8e#id',
      'ReportageNewsArticle',
    ],
    [
      'http://www.bbc.co.uk/things/3ded0816-13bf-4f1b-90d6-88f1686803d0#id',
      'ReviewNewsArticle',
    ],
    [
      'http://www.bbc.co.uk/things/08ac2b5c-889b-4597-821b-de3ed1d0ff15#id',
      'ReportageNewsArticle',
    ],
    [
      'http://www.bbc.co.uk/things/a057c92f-2d7e-4997-8310-80ca621d19fa#id',
      'ReportageNewsArticle',
    ],
  ])(
    'when the thing ID is set to %p it should return type %p',
    (typeId, expectedSchemaDotOrgType) => {
      let testTaggings = clone(passportTaggings);

      testTaggings.shift();

      testTaggings = [
        ...testTaggings,
        {
          predicate: 'http://www.bbc.co.uk/ontologies/creativework/format',
          value: typeId,
        },
      ];
      const testFormats = [
        {
          ...passportPredicatesFormats[0],
          value: typeId,
        },
      ];

      const schemaDotOrgType = categoryName(true, testTaggings, testFormats);

      expect(schemaDotOrgType).toEqual(expectedSchemaDotOrgType);
    },
  );
});

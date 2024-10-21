import { pathOr, isEmpty } from 'rambda';
import {
  MetadataFormats,
  MetadataTaggings,
} from '../../../../models/types/metadata';

export default (
  isTrustProjectParticipant: boolean,
  taggings: MetadataTaggings = [],
  formats: MetadataFormats = [],
) => {
  const supportedPredicate = taggings.filter(
    tagging =>
      tagging.predicate ===
      'http://www.bbc.co.uk/ontologies/creativework/format',
  );

  if (
    !isTrustProjectParticipant ||
    isEmpty(supportedPredicate) ||
    formats.length > 1
  ) {
    return 'NewsArticle';
  }

  const typeMapping: { [key: string]: string } = {
    'http://www.bbc.co.uk/things/170f311e-fd87-4255-85db-8b4aee12594d#id':
      'AnalysisNewsArticle',
    'http://www.bbc.co.uk/things/bb3ead7c-eb94-453b-b9de-34a59aba2fbf#id':
      'BackgroundNewsArticle',
    'http://www.bbc.co.uk/things/654e1609-7a9f-470a-bd87-fb8e8144c374#id':
      'OpinionNewsArticle',
    'http://www.bbc.co.uk/things/46c0517d-9927-4d1a-9954-8c63a3f7a888#id':
      'ReportageNewsArticle',
    'http://www.bbc.co.uk/things/8d1509ef-08ef-42bd-b831-82504eed9b8e#id':
      'ReportageNewsArticle',
    'http://www.bbc.co.uk/things/3ded0816-13bf-4f1b-90d6-88f1686803d0#id':
      'ReviewNewsArticle',
    'http://www.bbc.co.uk/things/08ac2b5c-889b-4597-821b-de3ed1d0ff15#id':
      'ReportageNewsArticle',
    'http://www.bbc.co.uk/things/a057c92f-2d7e-4997-8310-80ca621d19fa#id':
      'ReportageNewsArticle',
  };

  const formatValue = pathOr('', [0, 'value'], formats);

  return typeMapping[formatValue] ?? 'NewsArticle';
};

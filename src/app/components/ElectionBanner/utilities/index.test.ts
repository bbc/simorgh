import { Tag } from '#app/components/Metadata/types';
import { MetadataTaggings } from '#app/models/types/metadata';
import isElectionBannerVisible from '.';

const MOCK_ELECTION_THING_ID = '647d5613-e0e2-4ef5-b0ce-b491de38bdbd';
const SENSITIVE_ARTICLE_ID = 'f2b5dd0e-dda0-454c-893d-792d46ff48c3';

const matchingTaggings: MetadataTaggings = [
  {
    predicate: 'http://www.bbc.co.uk/ontologies/creativework/about',
    value: `http://www.bbc.co.uk/things/${MOCK_ELECTION_THING_ID}#id`,
  },
];

const getVisibilityArgs = () => ({
  electionBannerEnabled: true,
  electionThingIds: [MOCK_ELECTION_THING_ID],
  taggings: matchingTaggings,
});

describe('isElectionBannerVisible', () => {
  it('returns true for an enabled banner with a matching live-page tag', () => {
    expect(isElectionBannerVisible(getVisibilityArgs())).toBe(true);
  });

  it('returns true for an enabled banner with a matching aboutTag', () => {
    expect(
      isElectionBannerVisible({
        ...getVisibilityArgs(),
        taggings: undefined,
        aboutTags: [{ thingId: MOCK_ELECTION_THING_ID }] as Tag[],
      }),
    ).toBe(true);
  });

  it('returns false for an editorially sensitive live page', () => {
    expect(
      isElectionBannerVisible({
        ...getVisibilityArgs(),
        taggings: [
          ...matchingTaggings,
          { predicate: 'editorialSensitivity', value: SENSITIVE_ARTICLE_ID },
        ],
      }),
    ).toBe(false);
  });

  it('returns false when the banner toggle is disabled', () => {
    expect(
      isElectionBannerVisible({
        ...getVisibilityArgs(),
        electionBannerEnabled: false,
      }),
    ).toBe(false);
  });
});

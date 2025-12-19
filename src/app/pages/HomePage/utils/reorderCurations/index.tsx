import { Curation } from '../../../../models/types/curationData';

// constants with names to make this human readable and not just IDs
const HINDI_PORTRAIT_VIDEO_COLLECTION_ID =
  'urn:bbc:tipo:list:62d1e3f4-b727-4b7f-a351-e1100a2fd4f5';
const HINDI_TV_BULLETIN_ID =
  'urn:bbc:tipo:list:2323cbdf-5d76-425c-94e0-fe743831ce17';
const HINDI_MULTIMEDIA_ID =
  'urn:bbc:vivo:curation:23b426a2-6119-4c26-9c6b-b19d468186fd';

const TAMIL_PORTRAIT_VIDEO_COLLECTION_ID =
  'urn:bbc:tipo:list:cb7738b2-5316-4afe-9ec0-d8a133485704';
const TAMIL_TV_BULLETIN_ID =
  'urn:bbc:tipo:list:50073dbb-2566-4a70-971a-cf8d18107e52';
const TAMIL_VIDEOS_ID =
  'urn:bbc:vivo:curation:64b206e2-9d17-4059-8d93-7ce00b9331fe';

// order we want the AV curations in
const curationOrderHindi = [
  HINDI_PORTRAIT_VIDEO_COLLECTION_ID,
  HINDI_TV_BULLETIN_ID,
  HINDI_MULTIMEDIA_ID,
];

const curationOrderTamil = [
  TAMIL_PORTRAIT_VIDEO_COLLECTION_ID,
  TAMIL_TV_BULLETIN_ID,
  TAMIL_VIDEOS_ID,
];

type ReorderCurationsParams = {
  curations: Curation[];
  service: string;
};
// checks if the first curation is a billboard
const isBillboard = (curation: Curation) =>
  curation.visualStyle === 'BANNER' && curation.visualProminence === 'MAXIMUM';

// chooses the AV array based on the service
const getCurationOrder = (service: string) => {
  if (service === 'hindi') return curationOrderHindi;
  if (service === 'tamil') return curationOrderTamil;
  return [];
};

const reorderCurations = ({
  curations,
  service,
}: ReorderCurationsParams): Curation[] => {
  if (!curations.length) return [];

  const hasBillboard = isBillboard(curations[0]);
  // if there is a billboard, the top stories is 2nd, otherwise it is 1st
  const topStoriesIndex = hasBillboard ? 1 : 0;
  const topStories = curations[topStoriesIndex];
  // separate out the curations into before and after top stories.
  // we only need to reorder the ones after top stories
  const beforeTopStories = curations.slice(0, topStoriesIndex);
  const afterTopStories = curations.slice(topStoriesIndex + 1);
  // get the array with ordered curation IDs based on the service
  const curationOrder = getCurationOrder(service);
  // map the curations after top stories into a Map for easy lookup
  const curationsById = new Map(
    afterTopStories.map(curation => [curation.curationId, curation]),
  );
  // create an array of the curation objects in the order defined by curationOrder
  const orderedAfterTopStories = curationOrder
    .map(id => curationsById.get(id))
    .filter(Boolean) as Curation[];
  // filter out any curations that are not in the curationOrder and keep them in their original order
  const remainingAfterTopStories = afterTopStories.filter(
    curation =>
      typeof curation.curationId === 'string' &&
      !curationOrder.includes(curation.curationId),
  );
  // combine all the curations back together where the ordered curations are between top stories
  // and the remaining curations that we did not change the order of
  const reordered = [
    ...beforeTopStories,
    topStories,
    ...orderedAfterTopStories,
    ...remainingAfterTopStories,
  ];
  // add the position field back in based on the new order
  return reordered.map((curation, position) => ({
    ...curation,
    position,
  }));
};

export default reorderCurations;

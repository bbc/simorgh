import { Curation } from '../../../models/types/curationData';

// Hindi curation IDs
const HINDI_TOP_STORIES_ID =
  'urn:bbc:tipo:list:c5c30d41-8bb5-4681-8cd3-0d9231d9034a';
const HINDI_PORTRAIT_VIDEO_COLLECTION_ID =
  'urn:bbc:tipo:list:62d1e3f4-b727-4b7f-a351-e1100a2fd4f5';
const HINDI_TV_BULLETIN_ID =
  'urn:bbc:tipo:list:2323cbdf-5d76-425c-94e0-fe743831ce17';
const HINDI_MULTIMEDIA_ID =
  'urn:bbc:vivo:curation:23b426a2-6119-4c26-9c6b-b19d468186fd';

// Tamil curation IDs
const TAMIL_TOP_STORIES_ID =
  'urn:bbc:tipo:list:4b104710-c183-46f8-8f6f-ac50b971d485';
const TAMIL_PORTRAIT_VIDEO_COLLECTION_ID =
  'urn:bbc:tipo:list:cb7738b2-5316-4afe-9ec0-d8a133485704';
const TAMIL_TV_BULLETIN_ID =
  'urn:bbc:tipo:list:50073dbb-2566-4a70-971a-cf8d18107e52';
const TAMIL_VIDEOS_ID =
  'urn:bbc:vivo:curation:64b206e2-9d17-4059-8d93-7ce00b9331fe';

// The order we want for curations on the Hindi homepage
const curationOrderHindi = [
  HINDI_TOP_STORIES_ID,
  HINDI_PORTRAIT_VIDEO_COLLECTION_ID,
  HINDI_TV_BULLETIN_ID,
  HINDI_MULTIMEDIA_ID,
];
// The order we want for curations on the Tamil homepage
const curationOrderTamil = [
  TAMIL_TOP_STORIES_ID,
  TAMIL_PORTRAIT_VIDEO_COLLECTION_ID,
  TAMIL_TV_BULLETIN_ID,
  TAMIL_VIDEOS_ID,
];

type ReorderCurationsParams = {
  curations: Curation[];
  service: string;
};

const isBillboard = (curation: Curation) =>
  curation.visualStyle === 'BANNER' && curation.visualProminence === 'MAXIMUM';

const reorderCurations = ({
  curations,
  service,
}: ReorderCurationsParams): Curation[] => {
  let curationOrder: string[] | null = null;
  if (service === 'hindi') {
    curationOrder = curationOrderHindi;
  } else if (service === 'tamil') {
    curationOrder = curationOrderTamil;
  }

  if (!curationOrder) return curations;

  // eslint-disable-next-line no-console
  console.log(
    'Curations before reorder:',
    curations.map(({ curationId, position }) => ({ curationId, position })),
  );
  // If the first curation is a billboard, we want to keep it at the start
  // and reorder the rest of the curations after it
  // firstCuration is equivalent to curations[0], restCurations is the rest of the array
  const [firstCuration, ...restCurations] = curations;
  const useBillboardFirst = isBillboard(firstCuration);

  const curationsToOrder = useBillboardFirst ? restCurations : curations;

  // Get a Map that allows you to quickly look up a curation by its curationId,
  // which is more efficient than searching through an array and keeps insertion order.
  const curationsById = new Map(
    curationsToOrder.map(curation => [curation.curationId, curation]),
  );
  // orders the curations based on the predefined curationOrder array
  const orderedCurations = curationOrder
    .map(id => curationsById.get(id))
    .filter(Boolean) as Curation[];
  // any curations not in the curationOrder array are added to an 'others' array
  const others = curationsToOrder.filter(
    curation => !curationOrder.includes(curation.curationId ?? ''),
  );
  // combine the ordered curations with the 'others' array after it
  // and add the first curation back to the start if it was a billboard
  const reordered = useBillboardFirst
    ? [firstCuration, ...orderedCurations, ...others]
    : [...orderedCurations, ...others];

  // reassign positions based on new order
  const result = reordered.map((curation, position) => ({
    ...curation,
    position,
  }));

  // eslint-disable-next-line no-console
  console.log(
    'Curations after reorder:',
    result.map(({ curationId, position }) => ({ curationId, position })),
  );

  return result;
};

export default reorderCurations;

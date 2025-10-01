import { Curation } from '../../../models/types/curationData';

const TOP_STORIES_ID = 'urn:bbc:tipo:list:c5c30d41-8bb5-4681-8cd3-0d9231d9034a';
const PORTRAIT_VIDEO_COLLECTION_ID =
  'urn:bbc:tipo:list:62d1e3f4-b727-4b7f-a351-e1100a2fd4f5';
const TV_BULLETIN_ID = 'urn:bbc:tipo:list:2323cbdf-5d76-425c-94e0-fe743831ce17';
const MULTIMEDIA_ID =
  'urn:bbc:vivo:curation:23b426a2-6119-4c26-9c6b-b19d468186fd';

// The order we want for curations on the Hindi homepage
const curationOrderHindi = [
  TOP_STORIES_ID,
  PORTRAIT_VIDEO_COLLECTION_ID,
  TV_BULLETIN_ID,
  MULTIMEDIA_ID,
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
  if (service !== 'hindi') return curations;

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
  const orderedCurations = curationOrderHindi
    .map(id => curationsById.get(id))
    .filter(Boolean) as Curation[];
  // any curations not in the curationOrder array are added to an 'others' array
  const others = curationsToOrder.filter(
    curation => !curationOrderHindi.includes(curation.curationId ?? ''),
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

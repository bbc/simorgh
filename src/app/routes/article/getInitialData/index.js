import pipe from 'ramda/src/pipe';
import fetchPageData from '../../utils/fetchPageData';
import {
  augmentWithTimestamp,
  addIdsToBlocks,
  applyBlockPositioning,
} from '../../utils/sharedDataTransformers';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';

const transformJson = pipe(
  augmentWithTimestamp,
  addIdsToBlocks,
  applyBlockPositioning,
  // I think maybe a function here to add the index to the social embeds
  json => {
    console.log(json);
    console.log('blocks', json.content.model.blocks); // add the index somewhere in here
    // name the index property "indexOfType"

    return json;
  },
);

export default async ({ path, pageType }) => {
  try {
    const { json, status } = await fetchPageData({
      path,
      pageType,
    });

    return {
      status,
      pageData: transformJson(json),
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};

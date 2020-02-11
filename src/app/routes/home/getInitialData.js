import pipe from 'ramda/src/pipe';
import fetchPageData from '../fetchPageData';
import applyTimestampRules from '#lib/utilities/preprocessor/rules/timestamp';
import addIdsToBlocks from '#lib/utilities/preprocessor/rules/addIdsToBlocks';
import applyBlockPositioning from '#lib/utilities/preprocessor/rules/blockPositioning';

const processPageData = pipe(
  applyTimestampRules,
  addIdsToBlocks,
  applyBlockPositioning,
);

export default path => fetchPageData(path).then(processPageData);

import applyTimestampRules from '#lib/utilities/preprocessor/rules/timestamp';
import addIdsToBlocks from '#lib/utilities/preprocessor/rules/addIdsToBlocks';
import radioPageAddIdsToBlocks from '#lib/utilities/preprocessor/rules/radioPage/addIdsToBlocks';
import applyBlockPositioning from '#lib/utilities/preprocessor/rules/blockPositioning';
import parseInternalLinks from '#lib/utilities/preprocessor/rules/cpsAssetPage/convertToOptimoBlocks/blocks/internalLinks';
import convertToOptimoBlocks from '#lib/utilities/preprocessor/rules/cpsAssetPage/convertToOptimoBlocks';
import addHeadlineBlock from '#lib/utilities/preprocessor/rules/cpsAssetPage/addHeadlineBlock';
import timestampToMilliseconds from '#lib/utilities/preprocessor/rules/cpsAssetPage/timestampToMilliseconds';
import filterUnknownContentTypes from '#lib/utilities/preprocessor/rules/filterContentType';
import filterEmptyGroupItems from '#lib/utilities/preprocessor/rules/filterEmptyGroupItems';
import applySquashTopstories from '#lib/utilities/preprocessor/rules/topstories';
import addIdsToItems from '#lib/utilities/preprocessor/rules/addIdsToItems';
import filterGroupsWithoutStraplines from '#lib/utilities/preprocessor/rules/filterGroupsWithoutStraplines';
import addSummaryBlock from '#lib/utilities/preprocessor/rules/cpsAssetPage/addSummaryBlock';
import cpsOnlyOnwardJourneys from '#lib/utilities/preprocessor/rules/cpsAssetPage/cpsOnlyOnwardJourneys';

export const cpsAssetPreprocessorRules = [
  cpsOnlyOnwardJourneys,
  parseInternalLinks,
  timestampToMilliseconds,
  convertToOptimoBlocks,
  addHeadlineBlock,
  addSummaryBlock,
  applyTimestampRules,
  addIdsToBlocks,
  applyBlockPositioning,
];

export const articlesPreprocessorRules = [
  applyTimestampRules,
  addIdsToBlocks,
  applyBlockPositioning,
];

export const indexPreprocessorRules = [
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  addIdsToItems,
  applySquashTopstories,
  filterGroupsWithoutStraplines,
];

export const radioPagePreprocessorRules = [radioPageAddIdsToBlocks];

import augmentWithDisclaimer from '../../cpsAsset/getInitialData/augmentWithDisclaimer';
import { Toggles } from '#models/types/global';

const addDisclaimer = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageData: any,
  toggles: Toggles | undefined,
  isArticleSfv: boolean,
) => {
  if (!isArticleSfv) {
    try {
      return augmentWithDisclaimer({
        toggles,
        positionFromTimestamp: 0,
      })(pageData);
    } catch (e) {
      return pageData;
    }
  }
  return pageData;
};

export default addDisclaimer;

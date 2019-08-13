import { arrayOf, bool, shape, string, number } from 'prop-types';
import { mediaMetadataPropTypes } from '../metadata';
import { mediaPromoPropTypes } from '../promo';

export const mediaPageContentPropTypes = {
  content: shape({
    title: string.isRequired,
    subTitle: string.isRequired,
    blocks: arrayOf(
      shape({
        id: string.isRequired,
        type: string.isRequired,
        format: string.isRequired,
        title: string.isRequired,
        caption: string.isRequired,
        versions: arrayOf(
          shape({
            versionId: string.isRequired,
          }),
        ),
      }),
    ).isRequired,
  }),
};

export const mediaPageDataPropTypes = shape({
  metadata: shape(mediaMetadataPropTypes).isRequired,
  content: shape(mediaPageContentPropTypes).isRequired,
  promo: shape(mediaPromoPropTypes).isRequired,
});

const mediaPagePropTypes = {
  isAmp: bool,
  data: mediaPageDataPropTypes,
  service: string,
  status: number,
};

export default mediaPagePropTypes;

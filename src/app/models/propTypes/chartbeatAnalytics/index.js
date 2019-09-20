import { string, shape, number, bool, oneOf, oneOfType } from 'prop-types';

const baseChartbeatPropTypes = {
  domain: string.isRequired,
  sections: string.isRequired,
  uid: number.isRequired,
  title: string.isRequired,
  virtualReferrer: oneOfType([string, oneOf([null])]),
  idSync: shape({
    bbc_hid: string,
  }),
};

export const canonicalChartbeatPropTypes = shape({
  ...baseChartbeatPropTypes,
  type: string.isRequired,
  useCanonical: bool.isRequired,
});

export const ampChartbeatPropTypes = shape({
  ...baseChartbeatPropTypes,
  contentType: string.isRequired,
});

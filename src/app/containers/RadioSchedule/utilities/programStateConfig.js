import {
  C_KINGFISHER,
  C_POSTBOX,
  C_EBON,
  C_SHADOW,
  C_WHITE,
  C_METAL,
} from '@bbc/psammead-styles/colours';

const programStateConfig = {
  live: {
    backgroundColor: C_POSTBOX,
    headerTextColor: C_EBON,
    titleColor: C_SHADOW,
    durationColor: C_WHITE,
  },
  next: {
    backgroundColor: C_WHITE,
    headerTextColor: C_METAL,
    titleColor: C_METAL,
    durationColor: C_KINGFISHER,
  },
  onDemand: {
    backgroundColor: C_EBON,
    headerTextColor: C_EBON,
    titleColor: C_SHADOW,
    durationColor: C_WHITE,
  },
};

export default programStateConfig;

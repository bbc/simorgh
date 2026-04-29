// import { isLiveStatus } from '@bbc/web-sport-utils';
import { isLiveStatus } from './event-status-groups';

export const getStatusBorderStyles = ({ theme, status, isConciseView }) => {
  const borderStylesByMatchStatus = {
    PreEvent: `4px solid ${theme.colourPalette.primary}`,
    Postponed: `4px solid ${theme.colourPalette.secondary}`,
    Suspended: `4px solid ${theme.colourPalette.secondary}`,
    Cancelled: `4px solid ${theme.colourPalette.secondary}`,
    Abandoned: `4px solid ${theme.colourPalette.secondary}`,
    MidEvent: `4px solid ${theme.colourPalette.states.live}`,
    Intermission: `4px solid ${theme.colourPalette.states.live}`,
    PostEvent: `4px solid ${theme.colourPalette.accent}`,
  };

  if (isConciseView) {
    return borderStylesByMatchStatus[status];
  }

  return theme.colourPalette.states.live;
};

export const getStyledLineColour = ({ theme, status, isConciseView }) => {
  const verticalLineStyles = {
    PreEvent: theme.colourPalette.primary,
    Postponed: theme.colourPalette.border.decorativeStrong,
    Cancelled: theme.colourPalette.border.decorativeStrong,
    Abandoned: theme.colourPalette.border.decorativeStrong,
    Suspended: theme.colourPalette.border.decorativeStrong,
    MidEvent: theme.colourPalette.states.live,
    Intermission: theme.colourPalette.states.live,
    PostEvent: theme.colourPalette.accent,
  };

  if (isConciseView) {
    return verticalLineStyles[status];
  }

  return isLiveStatus(status)
    ? theme.colourPalette.states.liveText
    : theme.colourPalette.accent;
};

export const getScoreColourStyle = ({ status, theme, isConciseView }) => {
  const scoreStyles = {
    Postponed: theme.colourPalette.secondary,
    Cancelled: theme.colourPalette.secondary,
    Abandoned: theme.colourPalette.secondary,
    Suspended: theme.colourPalette.secondary,
    MidEvent: theme.colourPalette.states.live,
    Intermission: theme.colourPalette.states.live,
  };

  return isConciseView ? scoreStyles[status] : theme.colourPalette.primary;
};

export const getStyledMatchProgress = ({ status, theme, isConciseView }) => {
  const defaultColour = isConciseView
    ? theme.colourPalette.primary
    : theme.colourPalette.accent;

  return isLiveStatus(status)
    ? theme.colourPalette.states.liveText
    : defaultColour;
};

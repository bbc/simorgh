export const objToMilliseconds = ({ hours = 0, minutes = 0, seconds = 0 }) =>
  hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;

const minimumTimeout = objToMilliseconds({ seconds: 15 });

let timeoutHook;
let timeoutObj;

export const reloadAfterInactivity = (proposedTimeoutObj = {}) => {
  timeoutObj = proposedTimeoutObj;
  const proposedTimeout = objToMilliseconds(proposedTimeoutObj);
  const timeout =
    proposedTimeout > minimumTimeout ? proposedTimeout : minimumTimeout;
  timeoutHook = setTimeout(() => {
    window.location.reload();
  }, timeout);
};

export const resetInactivityTimer = () => {
  clearTimeout(timeoutHook);
  reloadAfterInactivity(timeoutObj);
};

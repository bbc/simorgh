const leftClick = button => button === 0;
const middleClick = button => button === 1 || button === 4; // middle click for IE is 4

const isClickWithShiftOnly = event =>
  leftClick(event.button) &&
  event.shiftKey &&
  !(event.metaKey || event.altKey || event.ctrlKey);

const isCommonOpenClicked = event =>
  middleClick(event.button) || isClickWithShiftOnly(event);

const isSupportedClickModifier = (event, functionKey) =>
  (functionKey && !event.shiftKey && !event.altKey) || // functionKey
  (event.shiftKey && functionKey && !event.altKey) || // shift + functionKey
  (event.shiftKey && functionKey && event.altKey) || // shift + functionKey + option/alt
  (event.shiftKey && event.altKey && !functionKey) || // shift + option/alt
  (event.altKey && functionKey && !event.shiftKey); // option/alt + cmd

const isMacOsOpenClicked = event =>
  leftClick(event.button) && isSupportedClickModifier(event, event.metaKey); // cmd

const isWindowsOpenClicked = event =>
  leftClick(event.button) && isSupportedClickModifier(event, event.ctrlKey); // ctrl

const isMacOs = () =>
  window && window.navigator && window.navigator.platform.startsWith('Mac');

export const isSafari = () =>
  window.navigator.vendor && window.navigator.vendor.startsWith('Apple');

export const isOpenClicked = event =>
  (isMacOs() ? isMacOsOpenClicked(event) : isWindowsOpenClicked(event)) ||
  isCommonOpenClicked(event);

export const isNotModifiedLeftClick = event =>
  leftClick(event.button) &&
  !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

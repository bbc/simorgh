export const isToggleEnabled = (toggleName, toggles) => {
  if (toggles[toggleName]) return toggles[toggleName];

  return false;
};

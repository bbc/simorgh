import { ToggleDefinition, Toggles } from '#app/models/types/global';

const getToggleDefinitions = (
  toggles: Toggles = {},
): Record<string, ToggleDefinition> => {
  const { _environment, ...toggleDefinitions } = toggles;
  return toggleDefinitions;
};

export default getToggleDefinitions;

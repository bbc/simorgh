import { Toggles, ToggleDefinition } from '#app/models/types/global';

export default function getToggleDefinition(
  toggles: Toggles,
  name: string,
): ToggleDefinition {
  const toggle = (toggles as Record<string, ToggleDefinition>)[name];

  return toggle ?? { enabled: false };
}

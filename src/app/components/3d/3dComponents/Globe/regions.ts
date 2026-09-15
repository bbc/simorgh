import type { CollapsibleNavigationSection } from '#app/components/CollapsibleNavigation/types';

import type { Region } from '#app/components/3d/3dModels/types';

/*
sub-meshes 1 to 6 on the globe.glb will map directly to WS content regions(Africa, Asia Pacific, Asia South, Europe, Latin America and Middle East).
to keep code DRY, Regions are taken from the collapsibleNavigation which itself gets regional data from the service config (src/app/lib/config/services/ws.ts).
*/
const getRegions = (
  collapsibleNavigation: CollapsibleNavigationSection[] = [],
): Region[] =>
  collapsibleNavigation
    .filter(section => section.links?.length)
    .map(({ id, title }) => ({ id, name: title }));

export default getRegions;

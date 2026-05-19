import type { ServiceTheme } from '#models/types/theming';

export default ({
  baseTheme,
  pwaTheme,
}: {
  baseTheme: ServiceTheme;
  pwaTheme: Partial<ServiceTheme>;
}) => ({
  ...baseTheme,
  typography: {
    ...baseTheme.typography,
    ...pwaTheme.typography,
  },
});

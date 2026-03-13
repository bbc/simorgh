import { ServiceTheme } from '#models/types/theming';

export default ({
  baseTheme,
  pwaTheme,
}: {
  baseTheme: ServiceTheme;
  pwaTheme: Partial<ServiceTheme>;
}) => {
  return {
    ...baseTheme,
    typography: {
      ...baseTheme.typography,
      ...pwaTheme.typography,
    },
  };
};

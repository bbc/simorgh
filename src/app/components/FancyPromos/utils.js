// https://www.w3.org/TR/WCAG20-TECHS/G17.html
export const getRelativeLuminance = components => {
  const unitGamma = x => x / 255;
  const lowGammaUnitLuminance = x => x / 12.92;
  const highGammaUnitLuminance = x => ((x + 0.055) / 1.055) ** 2.4;
  const unitLuminance = x =>
    x < 0.03928 ? lowGammaUnitLuminance(x) : highGammaUnitLuminance(x);
  const rgbCoefficients = [0.2126, 0.7152, 0.0722];
  const applyCoefficients = (x, i) => x * rgbCoefficients[i];
  const combine = ([r, g, b]) => r + g + b;

  const gammas = components
    .map(unitGamma)
    .map(unitLuminance)
    .map(applyCoefficients);

  return combine(gammas);
};

export const contrastRatioFromLuminances = (l1, l2) =>
  (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

export const clampLuminance = (components, max) => {
  const currentLuminance = getRelativeLuminance(components);
  if (currentLuminance <= max) return components;
  const distance = currentLuminance - max;
  const coefficient = max / currentLuminance + distance ** 2.4;
  return components.map(component => component * coefficient);
};

export const normalisePalette = (palette, { maximumLuminance } = {}) => {
  const normalisedPalette = {};
  Object.entries(palette).forEach(([key, value]) => {
    normalisedPalette[key] = {
      rgb: maximumLuminance
        ? clampLuminance(value._rgb, maximumLuminance)
        : value._rgb,
    };
  });

  normalisedPalette.ChameleonGrey8 = { rgb: [32, 34, 36] };

  return normalisedPalette;
};

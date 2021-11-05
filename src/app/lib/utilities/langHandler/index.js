const SERVICES_WITH_LANG_OVERRIDES = ['ukrainian'];

const SERVICE_LANG_OVERRIDE_MAP = {
  ru: 'ru-UA',
};

/**
 * Returns the name of a service lang override for the
 * current service and page lang combination, or undefined.
 */
const getLangOverride = ({ service, pageLang }) =>
  SERVICES_WITH_LANG_OVERRIDES.includes(service)
    ? SERVICE_LANG_OVERRIDE_MAP[pageLang]
    : undefined;

export default getLangOverride;

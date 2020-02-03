import togglesConfig from '../../../src/app/lib/config/toggles';

const useAppToggles = togglesConfig[Cypress.env('SIMORGH_APP_ENV')];

export default useAppToggles;

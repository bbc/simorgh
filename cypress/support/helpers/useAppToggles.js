import togglesConfig from '@lib/config/toggles';

const useAppToggles = togglesConfig[Cypress.env('APP_ENV')];

export default useAppToggles;

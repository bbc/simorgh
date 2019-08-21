import togglesConfig from '../../src/app/lib/config/toggles';

const toggles = togglesConfig[Cypress.env('APP_ENV')];

export default toggles;

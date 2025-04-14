import onClient from '#lib/utilities/onClient';

// @ts-expect-error Cypress is set on the window object when Cypress is running
export default () => onClient() && window.Cypress;

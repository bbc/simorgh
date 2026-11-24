import { getProcessEnvAppVariables } from '../getEnvConfig';
import setSimorghEnvVars from '.';

describe('setSimorghEnvVars', () => {
  const originalEnvVars = window.SIMORGH_ENV_VARS;

  afterEach(() => {
    window.SIMORGH_ENV_VARS = originalEnvVars;
  });

  it('sets the environment variables on the window object', () => {
    const envVars = getProcessEnvAppVariables();

    setSimorghEnvVars(envVars);

    expect(window.SIMORGH_ENV_VARS).toBe(envVars);
  });

  it('is declared as a classic function for Opera Mini compatibility', () => {
    expect(setSimorghEnvVars.toString()).toMatch(/^function /);
  });
});

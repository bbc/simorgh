export type AppEnv = 'local' | 'test' | 'live';

const baseUrlByEnv: Record<AppEnv, string> = {
  local: 'http://localhost:7081',
  test: 'https://www.test.bbc.com',
  live: 'https://www.bbc.com',
};

const isAppEnv = (value: string | undefined): value is AppEnv =>
  value !== undefined && value in baseUrlByEnv;

export const appEnvFromProcess: AppEnv = isAppEnv(process.env.APP_ENV)
  ? process.env.APP_ENV
  : 'local';

export const baseURL =
  process.env.PLAYWRIGHT_BASE_URL || baseUrlByEnv[appEnvFromProcess];

export const shouldRunForEnv = (runForEnv: AppEnv[]) =>
  runForEnv.includes(appEnvFromProcess);

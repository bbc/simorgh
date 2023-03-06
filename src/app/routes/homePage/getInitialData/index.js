import HOME_PAGE_TEST_CONFIG from './test-config';

export default async ({ path: pathname, service }) => {
  let environment = process.env.SIMORGH_APP_ENV;

  if (pathname.includes('renderer_env=test')) {
    environment = 'test';
  }
  if (pathname.includes('renderer_env=live')) {
    environment = 'live';
  }
  const id = environment === 'live' ? null : HOME_PAGE_TEST_CONFIG[service];
  console.log(`XXXX${id}`);
  return {
    status: 200,
    pageData: {
      id,
    },
  };
};

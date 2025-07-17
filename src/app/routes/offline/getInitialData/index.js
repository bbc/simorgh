import fetchPageData from '#app/routes/utils/fetchPageData';
import getConfig from '#app/routes/utils/getConfig';

export default async ({ service, variant, pathname }) => {
  const config = await getConfig(service, variant);

  try {
    const { status } = pathname
      ? await fetchPageData({
          path: pathname,
          service,
        })
      : { status: 200 };

    return {
      status,
      pageData: {
        metadata: {
          type: 'offline',
          serviceConfig: config,
        },
      },
    };
  } catch (error) {
    return {
      status: 200,
      pageData: {
        metadata: {
          type: 'offline',
          serviceConfig: config,
        },
      },
    };
  }
};

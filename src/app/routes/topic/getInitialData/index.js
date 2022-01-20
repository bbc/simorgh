export default async ({ fetch }) => {
  const spikePath = process.env.SIMORGH_BFF_PATH;
  const result = await fetch(spikePath);
  const { status } = result;
  const body = await result.json();
  const { data } = body;
  return {
    status,
    pageData: {
      ...data,
    },
  };
};

import { fablPath } from '../../../../../.secret';

export default async ({ fetch }) => {
  const spikePath = fablPath;
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

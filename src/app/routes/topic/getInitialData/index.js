import { fablPath } from '../../../../../.secret';

export default async ({ fetch }) => {
  const result = await fetch(fablPath);
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

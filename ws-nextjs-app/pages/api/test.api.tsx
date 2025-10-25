import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export const config = { runtime: 'nodejs' };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  res.status(200).json({ message: 'Hello from Next.js!' });
}

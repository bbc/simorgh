import type { NextApiRequest, NextApiResponse } from 'next';

export default function Login(_: NextApiRequest, res: NextApiResponse) {
  res.status(200).send('Ok');
}

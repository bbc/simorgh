import { Agent } from 'undici';

export interface FetchError extends Error {
  status: number;
}

export type GetAgent = ({
  timeout,
}: {
  timeout: number | null;
}) => Promise<Agent>;

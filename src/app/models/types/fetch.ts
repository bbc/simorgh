import { Agent } from 'undici';

export interface FetchError extends Error {
  status: number;
}

export type GetAgent = () => Promise<Agent>;

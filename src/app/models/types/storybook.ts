import { Services, Variants } from './global';

export type StoryArgs = Record<string, string | number | boolean>;

export interface StoryProps {
  service: Services;
  variant: Variants;
}

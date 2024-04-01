import { Services, Variants } from './global';

export type UnusedFirstArg = never;

export interface StoryProps {
  service: Services;
  variant: Variants;
}

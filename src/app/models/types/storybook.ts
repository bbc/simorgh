import { Services, Variants } from './global';

export type StoryArgs = Record<string, string | number | boolean>;

export interface TextVariant {
  text: string;
  longText: string;
  script: string;
  locale: string;
  timezone: string;
  articlePath: string;
  dir?: string;
  service?: Services;
  variant?: Variants;
}

export interface StoryProps extends Partial<TextVariant> {
  service: Services;
  variant: Variants;
  isLite?: boolean;
}

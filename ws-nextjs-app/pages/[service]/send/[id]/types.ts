import { Services, Variants } from '#app/models/types/global';
import { ParsedUrlQuery } from 'querystring';

export type InputProps = {
  id: string;
  name: string;
};

export interface PageDataParams extends ParsedUrlQuery {
  id: string;
  page?: string;
  service: Services;
  variant?: Variants;
  // eslint-disable-next-line camelcase
  renderer_env?: string;
  resolvedUrl: string;
}

export type FetchParameters = {
  id: string;
  service: Services;
  variant?: Variants;
};

type section = {
  sectionText: {
    title: string;
  };
  fields: FormField[];
};

type FormField = {
  id: string;
  type: string;
  validation: {
    mandatory: boolean;
  };
  htmlType: string;
  label: string;
  description: string;
  textArea?: boolean;
};

export type FormComponentProps = {
  id: string;
  htmlType: string;
  label: string;
};

export type ComponentProps = {
  pageData: {
    data: { title: string; description: string; sections: section[] };
  };
};

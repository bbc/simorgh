import { ChangeEvent } from 'react';
import { Services, Variants } from '#app/models/types/global';
import { ParsedUrlQuery } from 'querystring';

export type OnChangeInputName = ChangeEvent<HTMLInputElement>['target']['name'];

export type OnChangeInputValue =
  | ChangeEvent<HTMLInputElement>['target']['value']
  | boolean;

export type OnChangeHandler = (
  name: OnChangeInputName,
  value: OnChangeInputValue,
) => void;

export type InputProps = {
  id: string;
  name: string;
  onChange: OnChangeHandler;
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

export type HtmlType =
  | 'checkbox'
  | 'radiobutton'
  | 'select'
  | 'email'
  | 'text'
  | 'tel'
  | 'phone'
  | 'date'
  | 'time'
  | 'number'
  | 'url'
  | '';

type FormField = {
  id: string;
  type: string;
  validation: {
    min?: number;
    max?: number;
    fileTypes?: string[];
    mandatory?: boolean;
  };
  htmlType: HtmlType;
  label: string;
  description: string;
  textArea?: boolean;
};

export type ComponentProps = {
  pageData: {
    data: { title: string; description: string; sections: section[] };
  };
};

import { ChangeEvent } from 'react';
import { Services, Variants } from '#app/models/types/global';

export type OnChangeInputName = ChangeEvent<HTMLInputElement>['target']['name'];

export type OnChangeInputValue =
  | ChangeEvent<HTMLInputElement>['target']['value']
  | FileList
  | File
  | boolean;

export type OnChangeHandler = (
  name: OnChangeInputName,
  value: OnChangeInputValue,
) => void;

export type InputProps = {
  id: string;
  name: string;
  handleChange: (name: OnChangeInputName, value: OnChangeInputValue) => void;
  inputState: FieldData;
};

export type TooltipProps = {
  id: string;
  message: string;
};

export type FetchParameters = {
  id: string;
  service: Services;
  variant?: Variants;
};

type Section = {
  sectionText: {
    title: string;
  };
  fields: Field[];
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
  | 'textarea'
  | 'file'
  | '';

export type Field = {
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

export type FieldData = {
  invalid: boolean;
  required: boolean;
  value: OnChangeInputValue;
  type: string;
  invalidMessage: string;
};

export type PageProps = {
  pageData: {
    title: string;
    description: string;
    sections: Section[];
  };
};

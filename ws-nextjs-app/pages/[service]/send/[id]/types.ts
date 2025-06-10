import { ChangeEvent } from 'react';
import { Services, Variants } from '#app/models/types/global';

// Disabled due to known bug in ts-lint: https://github.com/typescript-eslint/tslint-to-eslint-config/issues/856
// eslint-disable-next-line no-shadow
export enum InvalidMessageCodes {
  ErrorSummary = 'errorSummary',
  FieldRequired = 'validationRequired',
  WrongEmailFormat = 'validationInvalidEmail',
  WrongTelFormat = 'validationInvalidTelephone',
  NotEnoughFiles = 'validationFilesNotEnough',
  TooManyFiles = 'validationFilesTooMany',
  WrongFileType = 'validationFilesInvalidType',
  FileTooSmall = 'validationFilesTooSmall',
  FileTooBig = 'validationFilesSizeExceeded',
}

export type OnChangeInputName = ChangeEvent<HTMLInputElement>['target']['name'];

export type FileData = {
  file: File;
  messageCode?: InvalidMessageCodes | null;
};

export type OnChangeInputValue =
  | ChangeEvent<HTMLInputElement>['target']['value']
  | FileData[]
  | boolean;

export type OnChangeHandler = (
  name: OnChangeInputName,
  value: OnChangeInputValue,
) => void;
export type OnFocusOutHandler = (name: OnChangeInputName) => void;

export type InputProps = {
  id: string;
  name: string;
  label: string;
  handleChange: (name: OnChangeInputName, value: OnChangeInputValue) => void;
  handleFocusOut: (name: OnChangeInputName) => void;
  inputState: FieldData;
  hasAttemptedSubmit: boolean;
};

export type InvalidMessageBoxProps = {
  id: string;
  messageCode: InvalidMessageCodes | null;
  hasArrowStyle?: boolean;
  isErrorSummary?: boolean;
  suffix?: string;
  validationCriteria?: ValidationConditions;
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

export type ValidationConditions = {
  min?: number;
  max?: number;
  fileTypes?: string[];
  mandatory?: boolean;
  wordLimit?: number;
};

export type Field = {
  id: string;
  type: string;
  validation: ValidationConditions;
  htmlType: HtmlType;
  label: string;
  description: string;
  textArea?: boolean;
};

export type FieldData = ValidationConditions & {
  hasNestedErrorLabel?: boolean;
  isValid: boolean;
  required: boolean;
  value: OnChangeInputValue;
  htmlType: HtmlType;
  messageCode: InvalidMessageCodes | null;
  wasInvalid: boolean;
};

export type Screen = 'form' | 'uploading' | 'success' | 'error';

export type PageProps = {
  initialScreen?: Screen;
  pageData: {
    title: string;
    description: string;
    settings: {
      replyEmailAddress: string;
      retentionPeriodDays: string;
    };
    sections: Section[];
    privacyNotice: {
      default: string;
      url: string;
      additional: string;
    };
    campaignStatus: 'open' | 'closed';
    openingTime?: string;
    closingTime?: string;
  };
};

export type UGCSendErrorResponse = {
  message: string;
  code: string;
  status: number;
};

export type ValidationError = {
  id: string;
  messageCode: InvalidMessageCodes | null;
};

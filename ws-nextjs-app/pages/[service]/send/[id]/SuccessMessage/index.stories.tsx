import React from 'react';
import ThemeProvider from '#app/components/ThemeProvider';
import SuccessMessage from './index';

const sampleSuccessResponse = {
  code: 'OK',
  submissionId: '269cb7fa-6221-4586-b54f-61c7beda705e',
  message: 'Success',
};

const Component = () => (
  <ThemeProvider service="pidgin">
    <SuccessMessage submissionId={sampleSuccessResponse.submissionId} />
  </ThemeProvider>
);

export default {
  title: 'Components/SuccessMessage',
  component: Component,
};

export const Default = Component;

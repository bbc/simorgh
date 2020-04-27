import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  ServiceContextProvider,
  ServiceContext,
} from '#contexts/ServiceContext';
import loggerMock from '#testHelpers/loggerMock';
import { NO_TRANSLATION_FOUND } from '#lib/logger.const';
import MediaMessage from '.';

const GenerateMediaMessage = () =>
  render(
    <ServiceContextProvider service="pidgin">
      <MediaMessage />
    </ServiceContextProvider>,
  );

const untranslatedContext = {
  service: 'afaanoromoo',
  translations: {
    media: {
      contentExpired: 'This content is no longer available',
    },
  },
};

const GenerateUntranslatedMediaMessage = () =>
  render(
    <ServiceContext.Provider value={untranslatedContext}>
      <MediaMessage />
    </ServiceContext.Provider>,
  );

describe('MediaMessage', () => {
  it('should output a translated media message', () => {
    const { getByText } = GenerateMediaMessage();
    const expectedMessage = 'Dis thing no dey again';
    expect(getByText(expectedMessage)).toBeInTheDocument();
  });

  it('should log an untranslated media message', () => {
    GenerateUntranslatedMediaMessage();
    const expectedLog = JSON.stringify(
      {
        event: NO_TRANSLATION_FOUND,
        message: `No afaanoromoo translation found for "This content is no longer available"`,
      },
      null,
      2,
    );
    expect(loggerMock.info).toHaveBeenCalledWith(expectedLog);
  });
});

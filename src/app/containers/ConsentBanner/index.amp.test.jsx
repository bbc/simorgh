/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

let AmpContainer;
let container;

jest.mock('./Banner/index.amp', () => jest.fn());
const Banner = require('./Banner/index.amp');

Banner.mockImplementation(({ type }) => <div>Amp {type} banner</div>);

describe('Amp Consent Banner Container', () => {
  beforeEach(() => {
    AmpContainer = require('./index.amp').default;

    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  shouldMatchSnapshot(
    'should correctly render AMP consent banner container',
    <AmpContainer />,
  );

  it('should render privacy banner when both banners are set to be shown', () => {
    act(() => {
      ReactDOM.render(<AmpContainer />, container);
    });

    expect(Banner).toHaveBeenCalledWith(
      {
        acceptAction: { tap: ['cookie.show, privacy.hide'] },
        promptId: 'privacy',
        rejectAction: { tap: ['cookie.show, privacy.hide'] },
        type: 'privacy',
      },
      {},
    );

    expect(Banner).toHaveBeenCalledWith(
      {
        acceptAction: { tap: ['consent.accept'] },
        hidden: true,
        promptId: 'cookie',
        rejectAction: { tap: ['consent.reject'] },
        type: 'cookie',
      },
      {},
    );
  });
});

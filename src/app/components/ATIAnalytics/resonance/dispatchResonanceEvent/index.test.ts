import onClient from '#app/lib/utilities/onClient';
import nodeLogger from '../../../../lib/logger.node';
import dispatchResonanceEvent from '.';
import { ResonanceEventModel } from '../types';

jest.mock('#app/lib/utilities/onClient');
jest.mock('../../../../lib/logger.node');

const mockLoggerError = jest.fn();
(nodeLogger as jest.Mock).mockReturnValue({ error: mockLoggerError });

describe('dispatchResonanceEvent', () => {
  const detail = {} as ResonanceEventModel;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not dispatch an event when not on client', () => {
    (onClient as jest.Mock).mockReturnValue(false);
    const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');

    dispatchResonanceEvent(detail);

    expect(dispatchEventSpy).not.toHaveBeenCalled();
  });

  it('should dispatch a viewability CustomEvent with the given detail when on client', () => {
    (onClient as jest.Mock).mockReturnValue(true);
    const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');

    dispatchResonanceEvent(detail);

    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'viewability', detail }),
    );
  });
});

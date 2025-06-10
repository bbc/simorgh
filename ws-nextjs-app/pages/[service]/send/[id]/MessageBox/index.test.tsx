import React from 'react';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import * as AndroidDetectionModule from '#hooks/useAdroidDetection';
import ErrorSummaryBox from './ErrorSummaryBox';
import * as FormContextModule from '../Form';
import { InvalidMessageCodes } from '../types';

jest.mock('next/router', () => ({
  useRouter: () => ({ query: { id: 'u1234' } }),
}));

const labelMap = {
  txt49018765: 'Nombre',
  txt49018835: 'Dirección de email (Obligatorio)',
  txt49019016: 'Comentario (Obligatorio)',
  upl130087996: 'Attach your file (optional)',
  chk49021805:
    'Estoy dispuesto/a a que la BBC me contacte en referencia a este comentario.',
} as Record<string, string>;

describe('ErrorSummaryBox', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should render an unordered list for multiple validation errors', async () => {
    jest
      .spyOn(FormContextModule, 'useFormContext')
      // @ts-expect-error - partial state values
      .mockImplementationOnce(() => ({
        validationErrors: [
          {
            id: 'txt49018765',
            messageCode: InvalidMessageCodes.FieldRequired,
          },
          {
            id: 'txt49018835',
            messageCode: InvalidMessageCodes.FieldRequired,
          },
          {
            id: 'txt49019016',
            messageCode: InvalidMessageCodes.FieldRequired,
          },
        ],
      }));
    const { container } = await act(() => {
      return render(<ErrorSummaryBox labelMap={labelMap} />);
    });

    const unorderedList = container.querySelector('ul');
    const listItem = container.querySelectorAll('li'); // fix for multiples

    expect(unorderedList).toBeInTheDocument();
    expect(listItem.length).toEqual(3);
  });

  it('should render a span not a list for a single validation error', async () => {
    jest
      .spyOn(FormContextModule, 'useFormContext')
      // @ts-expect-error - partial state values
      .mockImplementationOnce(() => ({
        validationErrors: [
          {
            id: 'txt49018765',
            messageCode: InvalidMessageCodes.FieldRequired,
          },
        ],
      }));
    const { container } = await act(() => {
      return render(<ErrorSummaryBox labelMap={labelMap} />);
    });

    const unorderedList = container.querySelector('ul[role=list]');
    const name = container.querySelector('span>a[href="#txt49018765"'); // add check for nombre

    expect(unorderedList).not.toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  it('should render links with href to input id and label name', async () => {
    jest
      .spyOn(FormContextModule, 'useFormContext')
      // @ts-expect-error - partial state values
      .mockImplementationOnce(() => ({
        validationErrors: [
          {
            id: 'txt49018765',
            messageCode: InvalidMessageCodes.FieldRequired,
          },
        ],
      }));
    const { container } = await act(() => {
      return render(<ErrorSummaryBox labelMap={labelMap} />);
    });

    const inputWithError = container.querySelector('a[href="#txt49018765"]');
    expect(inputWithError).toBeInTheDocument();
    expect(inputWithError?.textContent).toEqual(`Nombre`);
  });

  it('should render NO links for Android devices', async () => {
    jest.spyOn(AndroidDetectionModule, 'default').mockReturnValueOnce(true);
    jest
      .spyOn(FormContextModule, 'useFormContext')
      // @ts-expect-error - partial state values
      .mockImplementationOnce(() => ({
        validationErrors: [
          {
            id: 'txt49018765',
            messageCode: InvalidMessageCodes.FieldRequired,
          },
        ],
      }));
    const { container } = await act(() => {
      return render(<ErrorSummaryBox labelMap={labelMap} />);
    });

    const inputWithError = container.querySelectorAll('span')[1];
    expect(inputWithError).toBeInTheDocument();
    expect(inputWithError?.textContent).toEqual(`Nombre`);
  });

  it('should prefix fileUpload href so that focus is taken to Upload button label', async () => {
    jest
      .spyOn(FormContextModule, 'useFormContext')
      // @ts-expect-error - partial state values
      .mockImplementationOnce(() => ({
        validationErrors: [
          {
            id: 'upl130087996',
            messageCode: null,
          },
        ],
      }));
    const { container } = await act(() => {
      return render(<ErrorSummaryBox labelMap={labelMap} />);
    });

    const inputWithError = container.querySelector(
      'a[href="#label-upl130087996"]',
    );
    expect(inputWithError).toBeInTheDocument();
    expect(inputWithError?.textContent).toEqual(`Attach your file (optional)`);
  });
});

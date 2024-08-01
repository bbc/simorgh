import React from 'react';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import ErrorSummaryBox from './ErrorSummaryBox';
import * as ErrorListModule from '../FormContext/utils/getErrorList';

jest.mock('next/router', () => ({
  useRouter: () => ({ query: { id: 'u1234' } }),
}));

const labelMap = {
  txt49018765: 'Nombre',
  txt49018835: 'Dirección de email (Obligatorio)',
  txt49018894: 'Ciudad y país',
  txt49018963: 'Número de teléfono',
  txt49019016: 'Comentario (Obligatorio)',
  chk49021805:
    'Estoy dispuesto/a a que la BBC me contacte en referencia a este comentario.',
} as Record<string, string>;

describe('ErrorSummaryBox', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should render an unordered list for multiple validation errors', async () => {
    jest.spyOn(ErrorListModule, 'default').mockReturnValueOnce([
      {
        id: 'txt49018765',
        messageCode: 'validationRequired',
      },
      {
        id: 'txt49018835',
        messageCode: 'validationRequired',
      },
      {
        id: 'txt49019016',
        messageCode: 'validationRequired',
      },
    ]);
    const { container } = await act(() => {
      return render(<ErrorSummaryBox labelMap={labelMap} />);
    });

    const unorderedList = container.querySelector('ul');
    const listItem = container.querySelectorAll('li'); // fix for multiples

    expect(unorderedList).toBeInTheDocument();
    expect(listItem.length).toEqual(3);
  });

  it('should render a span not a list for a single validation error', async () => {
    jest.spyOn(ErrorListModule, 'default').mockReturnValueOnce([
      {
        id: 'txt49018765',
        messageCode: 'validationRequired',
      },
    ]);
    const { container } = await act(() => {
      return render(<ErrorSummaryBox labelMap={labelMap} />);
    });

    const unorderedList = container.querySelector('ul[role=list]');
    const name = container.querySelector('span>a[href="#txt49018765"'); // add check for nombre

    expect(unorderedList).not.toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  it('should render links with href to input id and label name', async () => {
    jest.spyOn(ErrorListModule, 'default').mockReturnValueOnce([
      {
        id: 'txt49018765',
        messageCode: 'validationRequired',
      },
    ]);
    const { container } = await act(() => {
      return render(<ErrorSummaryBox labelMap={labelMap} />);
    });

    const inputWithError = container.querySelector('a[href="#txt49018765"]');
    expect(inputWithError).toBeInTheDocument();
    expect(inputWithError?.textContent).toEqual(`Nombre`);
  });
});

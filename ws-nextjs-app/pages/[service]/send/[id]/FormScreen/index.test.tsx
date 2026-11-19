import {
  act,
  render,
  fireEvent,
} from '#app/components/react-testing-library-with-providers';
import mockMatchMedia from '#testHelpers/mockMatchMedia';
import {
  title,
  description,
  sectionTitle,
  privacyNotice,
  fields,
} from './fixture';
import * as FormContextModule from '../FormContext';
import { FormContext } from '../FormContext';
import Form from '.';
import { Field, FormScreen, InvalidMessageCodes, Section } from '../types';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: '123' },
  }),
}));

jest.mock('#app/hooks/useOptimizelyVariation', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useOptimizelyVariation'),
  default: jest.fn(),
}));

jest.mock('../FormContext', () => {
  const originalModule = jest.requireActual('../FormContext');
  return {
    __esModule: true,
    ...originalModule,
  };
});

const mockContextValue = {
  formState: {},
  handleChange: jest.fn(),
  handleFocusOut: jest.fn(),
  handleSubmit: jest.fn(),
  submitted: false,
  attemptedSubmitCount: 0,
  validationErrors: [],
  progress: '0',
  screen: 'form' as FormScreen,
  submissionID: '',
};

const sections: Section[] = [
  {
    sectionText: { title: sectionTitle },
    fields: fields as Field[],
  },
];

describe('Form', () => {
  beforeEach(() => {
    mockMatchMedia();
  });

  it('should render a form with title and fields', async () => {
    jest
      .spyOn(FormContextModule, 'useFormContext')
      .mockImplementationOnce(() => mockContextValue);

    const { container } = await act(() => {
      return render(
        <Form
          title={title}
          description={description}
          privacyNotice={privacyNotice}
          sections={sections}
        />,
      );
    });
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
  });
  it('should handle submit', async () => {
    const handleSubmit = jest.fn(e => e.preventDefault());
    const handleChange = jest.fn();
    const handleFocusOut = jest.fn();
    const { container } = await act(() => {
      return render(
        <FormContext.Provider
          value={{
            formState: {},
            handleChange,
            handleSubmit,
            handleFocusOut,
            submissionError: null,
            validationErrors: [],
            submitted: false,
            progress: '0',
            attemptedSubmitCount: 0,
            screen: 'form',
            submissionID: null,
          }}
        >
          <Form
            title={title}
            description={description}
            privacyNotice={privacyNotice}
            sections={sections}
          />
          ,
        </FormContext.Provider>,
      );
    });
    const submitButton = container.querySelector('button');
    fireEvent.click(submitButton as HTMLButtonElement);
    expect(handleSubmit).toHaveBeenCalled();
  });
  it('should render an error summary box on an invalid form', async () => {
    jest
      .spyOn(FormContextModule, 'useFormContext')
      .mockImplementationOnce(() => ({
        ...mockContextValue,
        validationErrors: [
          {
            id: 'txt49018765',
            messageCode: InvalidMessageCodes.FieldRequired,
          },
          {
            id: 'txt49018835',
            messageCode: InvalidMessageCodes.FieldRequired,
          },
        ],
        attemptedSubmitCount: 1,
      }))
      .mockImplementationOnce(() => ({
        ...mockContextValue,
        validationErrors: [
          {
            id: 'txt49018765',
            messageCode: InvalidMessageCodes.FieldRequired,
          },
          {
            id: 'txt49018835',
            messageCode: InvalidMessageCodes.FieldRequired,
          },
        ],
        attemptedSubmitCount: 1,
      }));
    const { container } = await act(() => {
      return render(
        <Form
          title={title}
          description={description}
          privacyNotice={privacyNotice}
          sections={sections}
        />,
      );
    });
    const errorSummary = container.querySelector('strong[id=errorSummaryBox]');
    expect(errorSummary).toBeInTheDocument();
  });
  it('should render no error summary box on a valid form', async () => {
    jest
      .spyOn(FormContextModule, 'useFormContext')
      .mockImplementationOnce(() => ({
        ...mockContextValue,
        attemptedSubmitCount: 1,
      }))
      .mockImplementationOnce(() => ({
        ...mockContextValue,
        attemptedSubmitCount: 1,
      }));
    const { container } = await act(() => {
      return render(
        <Form
          title={title}
          description={description}
          privacyNotice={privacyNotice}
          sections={sections}
        />,
      );
    });
    const errorSummmary = container.querySelector('strong[id=errorSummaryBox]');
    expect(errorSummmary).toBeNull();
  });

  it('should render every section and its fields', async () => {
    jest
      .spyOn(FormContextModule, 'useFormContext')
      .mockImplementationOnce(() => mockContextValue);

    const secondSectionField = {
      id: 'secondSectionField',
      type: 'text',
      validation: { mandatory: false },
      htmlType: 'text',
      label: 'Second section field',
      description: '',
    } as Field;

    const { getByRole, container } = await act(() => {
      return render(
        <Form
          title={title}
          description={description}
          privacyNotice={privacyNotice}
          sections={[
            ...sections,
            {
              sectionText: {
                title: 'Second section',
                description: '<p>Second section description</p>',
              },
              fields: [secondSectionField],
            },
          ]}
        />,
      );
    });

    expect(
      getByRole('heading', { level: 2, name: sectionTitle }),
    ).toBeInTheDocument();
    expect(
      getByRole('heading', { level: 2, name: 'Second section' }),
    ).toBeInTheDocument();
    expect(container).toHaveTextContent('Second section description');
    expect(
      container.querySelector('input[id=secondSectionField]'),
    ).toBeInTheDocument();
  });
});

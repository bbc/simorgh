import {
  act,
  fireEvent,
  render,
} from '#app/components/react-testing-library-with-providers';
import mockMatchMedia from '#testHelpers/mockMatchMedia';
import { FieldData, InvalidMessageCodes } from '../types';
import RadioButton from './RadioButton';

const options = [
  { label: 'First option', value: 'first' },
  { label: 'Second option', value: 'second' },
  { label: 'Third option', value: 'third' },
];

const buildInputState = (overrides: Partial<FieldData> = {}): FieldData => ({
  isValid: true,
  required: true,
  value: '',
  htmlType: 'radiobutton',
  messageCode: null,
  wasInvalid: false,
  options,
  ...overrides,
});

const renderRadioButton = (
  inputState: FieldData = buildInputState(),
  overrides: Partial<React.ComponentProps<typeof RadioButton>> = {},
) => {
  const handleChange = jest.fn();
  const handleFocusOut = jest.fn();

  const result = render(
    <RadioButton
      id="radio-group"
      name="radio-group"
      label="Choose one option"
      handleChange={handleChange}
      handleFocusOut={handleFocusOut}
      inputState={inputState}
      hasAttemptedSubmit={false}
      {...overrides}
    />,
  );

  return { ...result, handleChange, handleFocusOut };
};

describe('RadioButton', () => {
  beforeEach(() => {
    mockMatchMedia();
  });

  it('renders a fieldset, legend, radio button for each option, and associated labels', async () => {
    const { container } = await act(() => renderRadioButton());

    expect(container.querySelector('fieldset')).toBeInTheDocument();
    expect(container.querySelector('legend')).toHaveTextContent(
      'Choose one option',
    );

    const radioButtons = container.querySelectorAll('input[type="radio"]');
    expect(radioButtons).toHaveLength(options.length);

    options.forEach((option, index) => {
      const radioButton = radioButtons[index] as HTMLInputElement;
      const label = container.querySelector(`label[for="${radioButton.id}"]`);

      expect(radioButton).toHaveAttribute('name', 'radio-group');
      expect(radioButton).toHaveAttribute('value', option.value);
      expect(label).toHaveTextContent(option.label);
    });
  });

  it('checks the initial value and reports a changed selection', async () => {
    const { container, handleChange } = await act(() =>
      renderRadioButton(buildInputState({ value: 'first' })),
    );

    const firstRadioButton = container.querySelector(
      'input[value="first"]',
    ) as HTMLInputElement;
    const secondRadioButton = container.querySelector(
      'input[value="second"]',
    ) as HTMLInputElement;

    expect(firstRadioButton).toBeChecked();
    expect(secondRadioButton).not.toBeChecked();

    fireEvent.click(secondRadioButton);

    expect(handleChange).toHaveBeenCalledWith('radio-group', 'second');
  });

  it('calls handleFocusOut with the field name when an option loses focus', async () => {
    const { container, handleFocusOut } = await act(() => renderRadioButton());

    fireEvent.blur(
      container.querySelector('input[type="radio"]') as HTMLInputElement,
    );

    expect(handleFocusOut).toHaveBeenCalledWith('radio-group');
  });

  it('adds optional text when the group is not required', async () => {
    const { container } = await act(() =>
      renderRadioButton(buildInputState({ required: false })),
    );

    expect(container.querySelector('legend')).toHaveTextContent(/optional/i);
  });

  it('exposes invalid state and the validation message after submit', async () => {
    const { container } = await act(() =>
      renderRadioButton(
        buildInputState({
          isValid: false,
          messageCode: InvalidMessageCodes.FieldRequired,
          wasInvalid: true,
        }),
        { hasAttemptedSubmit: true },
      ),
    );

    const fieldset = container.querySelector('fieldset');
    expect(fieldset).toHaveAttribute('aria-invalid', 'true');
    expect(fieldset).toHaveAttribute('aria-required', 'true');
    expect(fieldset).toHaveAttribute('aria-describedby', 'radio-group-error');
    expect(container.querySelector('#radio-group-error')).toBeInTheDocument();
  });
});

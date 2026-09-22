import {
  act,
  fireEvent,
  render,
} from '#app/components/react-testing-library-with-providers';
import { FieldData, InvalidMessageCodes } from '../types';
import CheckboxGroup from './CheckboxGroup';

const options = [
  { label: 'First option', value: 'first' },
  { label: 'Second option', value: 'second' },
  { label: 'Third option', value: 'third' },
];

const buildInputState = (overrides: Partial<FieldData> = {}): FieldData => ({
  isValid: true,
  required: true,
  value: [],
  htmlType: 'checkbox',
  messageCode: null,
  wasInvalid: false,
  options,
  ...overrides,
});

const renderCheckboxGroup = (
  inputState: FieldData = buildInputState(),
  overrides: Partial<React.ComponentProps<typeof CheckboxGroup>> = {},
) => {
  const handleChange = jest.fn();
  const handleFocusOut = jest.fn();

  const result = render(
    <CheckboxGroup
      id="checkbox-group"
      name="checkbox-group"
      label="Choose all that apply"
      handleChange={handleChange}
      handleFocusOut={handleFocusOut}
      inputState={inputState}
      hasAttemptedSubmit={false}
      {...overrides}
    />,
  );

  return { ...result, handleChange, handleFocusOut };
};

describe('CheckboxGroup', () => {
  it('renders a fieldset, legend, checkbox for each option, and associated labels', async () => {
    const { container } = await act(() => renderCheckboxGroup());

    expect(container.querySelector('fieldset')).toBeInTheDocument();
    expect(container.querySelector('legend')).toHaveTextContent(
      'Choose all that apply',
    );

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes).toHaveLength(options.length);

    options.forEach((option, index) => {
      const checkbox = checkboxes[index] as HTMLInputElement;
      const label = container.querySelector(`label[for="${checkbox.id}"]`);

      expect(checkbox).toHaveAttribute('name', 'checkbox-group');
      expect(checkbox).toHaveAttribute('value', option.value);
      expect(label).toHaveTextContent(option.label);
    });
  });

  it('checks initial values and preserves other selections when an option changes', async () => {
    const { container, handleChange } = await act(() =>
      renderCheckboxGroup(buildInputState({ value: ['first'] })),
    );

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    const firstCheckbox = checkboxes[0] as HTMLInputElement;
    const secondCheckbox = checkboxes[1] as HTMLInputElement;

    expect(firstCheckbox).toBeChecked();
    expect(secondCheckbox).not.toBeChecked();

    fireEvent.click(secondCheckbox);
    expect(handleChange).toHaveBeenLastCalledWith('checkbox-group', [
      'first',
      'second',
    ]);
  });

  it('removes only the unchecked option', async () => {
    const { container, handleChange } = await act(() =>
      renderCheckboxGroup(buildInputState({ value: ['first', 'second'] })),
    );

    fireEvent.click(
      container.querySelector('input[value="first"]') as HTMLInputElement,
    );

    expect(handleChange).toHaveBeenLastCalledWith('checkbox-group', ['second']);
  });

  it('calls handleFocusOut with the field name when an option loses focus', async () => {
    const { container, handleFocusOut } = await act(() =>
      renderCheckboxGroup(),
    );

    fireEvent.blur(
      container.querySelector('input[type="checkbox"]') as HTMLInputElement,
    );

    expect(handleFocusOut).toHaveBeenCalledWith('checkbox-group');
  });

  it('adds optional text when the group is not required', async () => {
    const { container } = await act(() =>
      renderCheckboxGroup(buildInputState({ required: false })),
    );

    expect(container.querySelector('legend')).toHaveTextContent(/optional/i);
  });

  it('exposes invalid state and the validation message after submit', async () => {
    const { container } = await act(() =>
      renderCheckboxGroup(
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
    expect(fieldset).toHaveAttribute(
      'aria-describedby',
      'checkbox-group-error',
    );
    expect(
      container.querySelector('#checkbox-group-error'),
    ).toBeInTheDocument();
  });
});

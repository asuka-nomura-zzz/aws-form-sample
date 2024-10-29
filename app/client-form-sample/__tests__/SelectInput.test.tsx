import { render, screen, fireEvent } from '@testing-library/react';
import SelectInput from '../components/SelectInput';

describe('SelectInput Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    render(
      <SelectInput
        label="Test Label"
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
        onChange={mockOnChange}
      />
    );
  });

  it('renders the label', () => {
    const labelElement = screen.getByLabelText(/Test Label/i);
    expect(labelElement).toBeInTheDocument();
  });

  it('renders the options', () => {
    const option1 = screen.getByText(/Option 1/i);
    const option2 = screen.getByText(/Option 2/i);
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  it('calls onChange when an option is selected', () => {
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: '1' } });
    expect(mockOnChange).toHaveBeenCalled();
  });
});


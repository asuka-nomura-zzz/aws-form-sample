import { render, screen, fireEvent } from "@testing-library/react";
import CheckboxInput from "../components/CheckboxInput";

describe('CheckboxInput Test', () => {
  const mockOnChange = jest.fn();

  it('has and accessible name in the DOM', () => {
    render(<CheckboxInput label="Test Label" checked={false} onChange={mockOnChange} />)
    const input = screen.getByLabelText(/test label/i);
    expect(input).toBeInTheDocument();
  })
  it('calls mock function once', () => {
    render(<CheckboxInput label="Test Label" checked={false} onChange={mockOnChange} />)
    const input = screen.getByLabelText(/test label/i);
    fireEvent.click(input);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  })
})
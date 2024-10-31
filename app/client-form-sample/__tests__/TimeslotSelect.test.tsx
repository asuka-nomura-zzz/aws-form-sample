import { render, screen, fireEvent } from "@testing-library/react";
import TimeslotSelect from "../components/TimeslotSelect";
import { Timeslot } from "../types/Timeslot";

describe('TimeslotSelect Component', () => {
  const mockOnChange = jest.fn();
  const timeslots: Timeslot[] = [
    { id: 1, name: 'Morning', stock: 10 },
    { id: 2, name: 'Afternoon', stock: 20 },
    { id: 3, name: 'Evening', stock: 30 },
  ];

  it('renders options correctly', () => {
    render(<TimeslotSelect timeslots={timeslots} onChange={mockOnChange} />);

    const selectElement = screen.getByLabelText(/時間帯/i);
    expect(selectElement).toBeInTheDocument();

    timeslots.forEach(timeslot => {
      expect(screen.getByRole('option', { name: timeslot.name })).toBeInTheDocument();
    });
  });

  it('calls onChange when an option is selected', () => {
    render(<TimeslotSelect timeslots={timeslots} onChange={mockOnChange} />);

    const selectElement = screen.getByLabelText(/時間帯/i);
    fireEvent.change(selectElement, { target: { value: '1' } });

    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalledWith(expect.anything());
  });
});
import { render, screen, fireEvent } from "@testing-library/react";
import CompanionInputs from "../components/CompanionInputs";

describe('CompanionInputs Component', () => {
  const mockSetFirstName = jest.fn();
  const mockSetSecondName = jest.fn();

  it('renders input for the first companion when numberOfAttendees is 2', () => {
    render(
      <CompanionInputs
        numberOfAttendees={2}
        firstCompanionName=""
        setFirstCompanionName={mockSetFirstName}
        secondCompanionName=""
        setSecondCompanionName={mockSetSecondName}
      />
    );

    expect(screen.getByLabelText(/一人目の同行者様/i)).toBeInTheDocument();
  });

  it('renders input for the second companion when numberOfAttendees is 3', () => {
    render(
      <CompanionInputs
        numberOfAttendees={3}
        firstCompanionName=""
        setFirstCompanionName={mockSetFirstName}
        secondCompanionName=""
        setSecondCompanionName={mockSetSecondName}
      />
    );

    expect(screen.getByLabelText(/二人目の同行者様/i)).toBeInTheDocument();
  });

  it('does not render any inputs when numberOfAttendees is less than 2', () => {
    render(
      <CompanionInputs
        numberOfAttendees={1}
        firstCompanionName=""
        setFirstCompanionName={mockSetFirstName}
        secondCompanionName=""
        setSecondCompanionName={mockSetSecondName}
      />
    );

    expect(screen.queryByLabelText(/一人目の同行者様/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/二人目の同行者様/i)).not.toBeInTheDocument();
  });

  it('calls setFirstCompanionName when first companion input changes', () => {
    render(
      <CompanionInputs
        numberOfAttendees={2}
        firstCompanionName=""
        setFirstCompanionName={mockSetFirstName}
        secondCompanionName=""
        setSecondCompanionName={mockSetSecondName}
      />
    );

    const input = screen.getByLabelText(/一人目の同行者様/i);
    fireEvent.change(input, { target: { value: 'John Doe' } });

    expect(mockSetFirstName).toHaveBeenCalledWith('John Doe');
  });

  it('calls setSecondCompanionName when second companion input changes', () => {
    render(
      <CompanionInputs
        numberOfAttendees={3}
        firstCompanionName=""
        setFirstCompanionName={mockSetFirstName}
        secondCompanionName=""
        setSecondCompanionName={mockSetSecondName}
      />
    );

    const input = screen.getByLabelText(/二人目の同行者様/i);
    fireEvent.change(input, { target: { value: 'Jane Doe' } });

    expect(mockSetSecondName).toHaveBeenCalledWith('Jane Doe');
  });
});
import { render, screen } from "@testing-library/react";
import FormInput from "../components/FormInput";

describe('FormInput Component', () => {
  it('confirms that there is an accessible name in the rendering result', () => {
    render(<FormInput label="Test Label" value="" onChange={() => {}} />);
    
    const input = screen.getByLabelText(/test label/i);
    expect(input).toBeInTheDocument();
  });

  it('renders input with correct type', () => {
    render(<FormInput label="Test Label" value="" onChange={() => {}} type="password" />);
    
    const input = screen.getByLabelText(/test label/i);
    expect(input).toHaveAttribute('type', 'password');
  });

});
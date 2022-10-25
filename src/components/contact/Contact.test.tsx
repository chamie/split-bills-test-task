import { render, screen } from '@testing-library/react';
import { Contact, Props } from './Contact';

const mockContact: Props = {
    id: 10,
    isChecked: false,
    name: "Mock Name",
    onCheck: () => { },
    onNameClick: () => { },
}

describe('Contact component', () => {
    it('should render name as text', () => {
        // Act
        render(
            <Contact
                {...mockContact}
            />
        );

        // Assert
        expect(screen.getByText(mockContact.name)).toBeInTheDocument();
    });

    it('should renders name as checkbox aria-label', () => {
        // Act
        render(
            <Contact
                {...mockContact}
            />
        );

        // Assert
        expect(screen.getByLabelText(mockContact.name)).toBeInTheDocument();
    });
});
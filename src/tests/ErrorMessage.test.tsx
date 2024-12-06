import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '../components/ErrorMessage';

describe('ErrorMessage', () => {

    it('should render the correct error message', () => {
        const message = 'Something bad happened :(';

        render(<ErrorMessage message={message} />);

        const errorMessageElement = screen.getByText(message);

        expect(errorMessageElement).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const message = 'Terrifying error occurred';

        const { asFragment } = render(<ErrorMessage message={message} />);

        expect(asFragment()).toMatchSnapshot();
    });
});

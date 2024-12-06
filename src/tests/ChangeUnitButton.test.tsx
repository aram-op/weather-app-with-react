import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChangeUnitButton from '../components/ChangeUnitButton';

describe('ChangeUnitButton', () => {

    it('should render correctly', () => {
        const { asFragment } = render(<ChangeUnitButton onUnitChange={jest.fn()} />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('should call onUnitChange when the button is clicked', () => {
        const onUnitChangeMock = jest.fn();

        render(<ChangeUnitButton onUnitChange={onUnitChangeMock} />);

        const button = screen.getByText('Change Unit');

        fireEvent.click(button);

        expect(onUnitChangeMock).toHaveBeenCalledTimes(1);
    });
});

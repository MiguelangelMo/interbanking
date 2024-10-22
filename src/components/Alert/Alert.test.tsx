import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Alert from './Alert';
import '@testing-library/jest-dom';

describe('Alert component', () => {
    let setStateMock: jest.Mock;
    const message = 'This is a warning message';

    beforeEach(() => {
        setStateMock = jest.fn();
    });

    test('renders the alert with the correct message', () => {
        render(<Alert message={message} setState={setStateMock} />);

        // Verificar que el mensaje se muestra en el componente
        expect(screen.getByText(/Uffs/i)).toBeInTheDocument();
        expect(screen.getByText(message)).toBeInTheDocument();
    });

    test('calls setState with empty string when close button is clicked', () => {
        render(<Alert message={message} setState={setStateMock} />);

        // Simular clic en el botón de cerrar
        const closeButton = screen.getByRole('button', { name: /close/i });
        fireEvent.click(closeButton);

        // Verificar que setState se llama con una cadena vacía
        expect(setStateMock).toHaveBeenCalledWith('');
    });
});

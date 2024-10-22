import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';
import '@testing-library/jest-dom';

describe('Button component', () => {
    let onClickMock: jest.Mock;

    beforeEach(() => {
        onClickMock = jest.fn();
    });

    test('renders the button with the correct title', () => {
        const title = 'Click me';
        render(<Button title={title} onClick={onClickMock} styles="" />);

        // Verificar que el botón tiene el texto correcto
        const buttonElement = screen.getByText(title);
        expect(buttonElement).toBeInTheDocument();
    });

    test('applies default styles when styles prop is not provided', () => {
        render(<Button title="Click me" onClick={onClickMock} styles="" />);

        // Verificar que el botón tiene las clases de estilo predeterminadas
        const buttonElement = screen.getByText('Click me');
        expect(buttonElement).toHaveClass('btn btn-success btn-lg');
    });

    test('applies custom styles when styles prop is provided', () => {
        const customStyles = 'btn btn-primary';
        render(<Button title="Click me" onClick={onClickMock} styles={customStyles} />);

        // Verificar que el botón tiene las clases de estilo personalizadas
        const buttonElement = screen.getByText('Click me');
        expect(buttonElement).toHaveClass(customStyles);
    });

    test('calls onClick when button is clicked', () => {
        render(<Button title="Click me" onClick={onClickMock} styles="" />);

        const buttonElement = screen.getByText('Click me');
        fireEvent.click(buttonElement);

        // Verificar que la función onClick se llama al hacer clic en el botón
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';
import { FormInterface, FormSearchInterface } from '../Form/interface/Form';
import '@testing-library/jest-dom';

describe('Input Component', () => {
    let setStateMock: jest.Mock;
    let initialState: FormInterface | FormSearchInterface;

    beforeEach(() => {
        setStateMock = jest.fn();
        initialState = { description: '', title: 'new value' };
    });

    test('should render input with correct props', () => {
        render(
            <Input
                maxLength={10}
                minLength={3}
                type="text"
                placeholder="Enter text"
                required={true}
                state={initialState}
                name="title"
                setState={setStateMock}
            />
        );

        const inputElement = screen.getByPlaceholderText('Enter text');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('type', 'text');
        expect(inputElement).toHaveAttribute('maxLength', '10');
        expect(inputElement).toHaveAttribute('minLength', '3');
        expect(inputElement).toBeRequired();
    });

    test('should call setState on input change', () => {
        render(
            <Input
                maxLength={10}
                minLength={3}
                type="text"
                placeholder="Enter text"
                required={true}
                state={initialState}
                name="title"
                setState={setStateMock}
            />
        );

        const inputElement = screen.getByPlaceholderText('Enter text');
        fireEvent.change(inputElement, { target: { value: 'updated title' } });
        expect(setStateMock).toHaveBeenCalledWith({
            ...initialState,
            title: 'updated title',
        });
    });
});

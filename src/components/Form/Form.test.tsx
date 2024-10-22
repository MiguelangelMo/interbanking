import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Form from './Form';
import { ArrCards } from '../../interface/App';
import Strings from './String';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);
const initialState = {
    testRedux: { test: [] }
};

describe('Form Component', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let store: any;
    let setStateMock: jest.Mock;

    beforeEach(() => {
        store = mockStore(initialState);
        setStateMock = jest.fn();
    });

    test('should render inputs and button correctly', () => {
        render(
            <Provider store={store}>
                <Form state={[]} setState={setStateMock} />
            </Provider>
        );

        const titleInput = screen.getByPlaceholderText(Strings.title);
        const descInput = screen.getByPlaceholderText(Strings.desc);
        const searchInput = screen.getByPlaceholderText('Buscador...');
        const addButton = screen.getByText('Agregar');

        expect(titleInput).toBeInTheDocument();
        expect(descInput).toBeInTheDocument();
        expect(searchInput).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
    });

    test('should show error if title or description is empty', () => {
        render(
            <Provider store={store}>
                <Form state={[]} setState={setStateMock} />
            </Provider>
        );

        const addButton = screen.getByText('Agregar');
        fireEvent.click(addButton);

        expect(screen.getByText(Strings.required)).toBeInTheDocument();
    });

    test('should call setState when form is valid and button clicked', () => {
        const initialCards: ArrCards[] = [];
        render(
            <Provider store={store}>
                <Form state={initialCards} setState={setStateMock} />
            </Provider>
        );

        const titleInput = screen.getByPlaceholderText(Strings.title);
        const descInput = screen.getByPlaceholderText(Strings.desc);
        const addButton = screen.getByText('Agregar');
        fireEvent.change(titleInput, { target: { value: 'New Title' } });
        fireEvent.change(descInput, { target: { value: 'This is a valid description' } });
        fireEvent.click(addButton);
        expect(setStateMock).toHaveBeenCalledWith([
            {
                id: 1,
                title: 'New Title',
                description: 'This is a valid description',
            },
        ]);
    });
});

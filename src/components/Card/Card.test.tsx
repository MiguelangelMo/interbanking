import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';
import { ArrCards } from '../../interface/App';
import '@testing-library/jest-dom';

describe('Card component', () => {
    let arrCards: ArrCards[];
    let setStateMock: jest.Mock;

    beforeEach(() => {
        setStateMock = jest.fn();
        arrCards = [
            { id: 1, title: 'Card 1', description: 'Description 1' },
            { id: 2, title: 'Card 2', description: 'Description 2' },
            { id: 3, title: 'Card 3', description: 'Description 3' }
        ];
    });

    test('renders the correct number of cards', () => {
        render(<Card arrCards={arrCards} setState={setStateMock} />);
        arrCards.forEach(card => {
            expect(screen.getByText(card.title)).toBeInTheDocument();
            expect(screen.getByText(card.description)).toBeInTheDocument();
        });
    });

    test('calls setState with the correct array when a card is deleted', () => {
        render(<Card arrCards={arrCards} setState={setStateMock} />);
        const deleteButton = screen.getAllByText('Eliminar')[1];
        fireEvent.click(deleteButton);
        const expectedArray = [
            { id: 1, title: 'Card 1', description: 'Description 1' },
            { id: 3, title: 'Card 3', description: 'Description 3' }
        ];
        expect(setStateMock).toHaveBeenCalledWith(expectedArray);
    });

    test('calls onDelete and updates state when delete button is clicked', () => {
        render(<Card arrCards={arrCards} setState={setStateMock} />);
        const deleteButton = screen.getAllByText('Eliminar')[0];
        fireEvent.click(deleteButton);
        const updatedArray = [
            { id: 2, title: 'Card 2', description: 'Description 2' },
            { id: 3, title: 'Card 3', description: 'Description 3' }
        ];
        expect(setStateMock).toHaveBeenCalledWith(updatedArray);
    });
});

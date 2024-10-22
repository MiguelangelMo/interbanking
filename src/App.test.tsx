import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import '@testing-library/jest-dom';

// eslint-disable-next-line react/display-name
jest.mock('./components/Form/Form', () => () => <div>Mocked Form</div>);
// eslint-disable-next-line react/display-name
jest.mock('./components/Card/Card', () => () => <div>Mocked Card</div>);

describe('App Component', () => {
    test('should render Form and Card components', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        expect(screen.getByText('Mocked Form')).toBeInTheDocument();
        expect(screen.getByText('Mocked Card')).toBeInTheDocument();
    });
});
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './redux';
import { thunk } from 'redux-thunk';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const store = createStore(reducer, compose(applyMiddleware(thunk)));

export default store;
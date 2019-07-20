import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";
import reducers from './reducers';
import homeReducers from './homeReducers'
import rootSagas from './sagas'
import { composeWithDevTools } from 'redux-devtools-extension';
const sagaMiddleware = createSagaMiddleware();
export function configureStore(initialState) {
    let username = localStorage.getItem("username");
    let tmpReducers = username != null && username.trim() != "" ? reducers : homeReducers
    const store = createStore(
        tmpReducers,
        initialState,
        composeWithDevTools(
            applyMiddleware(sagaMiddleware),
        )
    );
   sagaMiddleware.run(rootSagas);
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import allReducers from './redux/reducers';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

// create store and add chrome extension tools for debuging via chrome. source: https://github.com/zalmoxisus/redux-devtools-extension
const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}> {/* This takes one attribute. store={theNameOfYourStore} */}
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { Store } from './store';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
	<Provider store={Store}>
		<BrowserRouter><App /></BrowserRouter>
	</Provider>
  , document.getElementById('root'));


serviceWorker.unregister();

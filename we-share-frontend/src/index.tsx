import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { store } from './redux/store';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <Router>
    <Provider store={store}>
    <App />
    </Provider>
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

import '@babel/polyfill';
import 'whatwg-fetch';
import 'es6-promise/auto';
import './styles/index.scss';
import * as React from 'react';
import bootstrap from 'veigar/bootstrap';

import { Provider } from 'react-redux';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';

import createHashHistory from 'history/createHashHistory';

import { create as createAppStore } from './core/store';

import App from './container';

// Create a history of your choosing (we're using a browser history in this case)
const hashHistory = createHashHistory();

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(hashHistory);

const store = createAppStore({
    router: connectRouter(hashHistory)
  },
  {},
  [historyMiddleware]
);

bootstrap(() => (
  <Provider store={store}>
    <ConnectedRouter history={hashHistory}>
      <App/>
    </ConnectedRouter>
  </Provider>
));

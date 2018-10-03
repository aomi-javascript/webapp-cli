import * as React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import { getActions, getState } from '../core/store';
import routes from '../core/router.config';

function createRender(route) {
  return props => {
    document.title = route.title || '';
    const params = getState().navigator.router[route.path];
    // pass the sub-routes down to keep nesting
    return (
      <route.component {...props}
                       params={params}
      />
    );
  };
}

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/2
 */
export default class App extends React.Component<any, any> {

  componentWillMount() {
    getActions().root.start();
  }

  render() {
    return (
      <HashRouter>
        <React.Fragment>
          <Route exact
                 path="/"
                 render={() => (<Redirect to="/home"/>)}
          />
          {routes.map((route: any, index) => (
            <Route path={route.path}
                   render={createRender(route)}
                   key={index}
                   exact={route.exact}
            />
          ))}
        </React.Fragment>
      </HashRouter>
    );
  }

}

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';

// Redux
import { Provider } from 'react-redux';
import store from './store';

//
import { loadUser } from './actions/auth.actions';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
};

export default App;

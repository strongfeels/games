import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { loadUser } from './action/authAction';
import { setToken } from './setToken';
import SearchBar from './searchBar/searchBar.js'

if(localStorage.getItem('token')){
  setToken(localStorage.getItem('token'));
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  })

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/login" component={Login}/>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App

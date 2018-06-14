import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import Posts from "./components/Posts";
import NewPost from './components/NewPost';
import Post from './components/Post';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Posts} />
          <Route path="/posts/new" component={NewPost} />
          <Route path="/posts/:id" component={Post} />
        </Switch>
      </div>
    </Router>
  </Provider>
  , document.querySelector('.container'));

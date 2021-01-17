import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './login';
import Index from './index';

const Main: React.FC <{}> = () => {
  return (
    <Router>
      <Route>
        <Route path="/login/" exact component={Login}></Route>
        <Route path="/index/" exact component={Index}></Route>
      </Route>
    </Router>
  );
};

export default Main;

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import ProfessorAccount from './components/professorAccout/ProfessorAccount';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/useraccount" component={ProfessorAccount} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

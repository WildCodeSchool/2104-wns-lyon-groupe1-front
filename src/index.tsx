import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import UserContext from './utils/UserContext';
import { IUser } from './utils/interface';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const userFromApi: IUser = {
  id: '1',
  firstname: 'John',
  lastname: 'Doe',
  isTeacher: true,
};

ReactDOM.render(
  <StrictMode>
    <Router>
      <UserContext.Provider value={userFromApi}>
        <App />
      </UserContext.Provider>
    </Router>
  </StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { UserContext, useUserContext } from './utils/UserContext';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache(),
});

const CtxProvider = ({ children }: any) => {
  // PROD
  // const [user, addUser, removeUser] = useUserContext();
  // DEV
   const [user, addUser, removeUser] = useUserContext({
     id: '1',
     firstname: 'John',
     lastname: 'Doe',
     isTeacher: false,
     mail: 'nicolas.legrand@aze.com',
     classroom: {
       name: 'Développement web Lyon',
       year: '2021/2022',
       classroomId: '1',
     },
   });
  return (
    <UserContext.Provider value={{ user, addUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <CtxProvider>
          <App />
        </CtxProvider>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

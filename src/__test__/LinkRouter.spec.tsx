import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { UserContext } from '../utils/UserContext';
import { connectUserStudent, connectUserTeacher } from './utils';
import App from '../App';

const allRoutes = [
  {
    uri: '/forums',
    testid: 'blue-btn',
  },
  {
    uri: '/mon-espace',
    testid: 'green-btn',
  },
  {
    uri: '/nous-contacter',
    testid: 'contact',
  },
  {
    uri: '/notre-équipe',
    testid: 'team',
  },
  {
    uri: '/mentions-legales',
    testid: 'mention',
  },
];
const studentRoute = [
  {
    uri: '/mes-matières',
    testid: 'yellow-btn',
  },
];
const teacherRoute = [
  {
    uri: '/mes-fiches-de-revisions',
    testid: 'yellow-btn',
  },
];
describe('Les différentes route du site sont accessible étant connecté comme professeur', () => {
  allRoutes.concat(teacherRoute).forEach((r) => {
    test(r.uri, async () => {
      let testLocation = { pathname: '' };
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <MemoryRouter>
            <UserContext.Provider
              value={{
                user: connectUserTeacher,
                addUser: () => {},
                removeUser: () => {},
              }}
            >
              <App />
              <Route
                path="*"
                render={({ location }) => {
                  testLocation = location;
                  return null;
                }}
              />
            </UserContext.Provider>
          </MemoryRouter>
        </MockedProvider>,
      );

      fireEvent.click(screen.getByTestId(r.testid));
      expect(testLocation.pathname).toBe(r.uri);
    });
  });
  // On les implémentera quand les composants seront créés
  xtest('/ajouter-une-fiche', () => {});
  xtest('/rechercher', () => {});
  xtest('/ma-promotion', () => {});
  xtest('/ajouter-un-élève', () => {});
  xtest('/ajouter-une-promotion', () => {});
});

describe('Les différentes route du site sont accessible étant connecté comme élève', () => {
  allRoutes.concat(studentRoute).forEach((r) => {
    test(r.uri, async () => {
      let testLocation = { pathname: '' };
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <MemoryRouter>
            <UserContext.Provider
              value={{
                user: connectUserStudent,
                addUser: () => {},
                removeUser: () => {},
              }}
            >
              <App />
              <Route
                path="*"
                render={({ location }) => {
                  testLocation = location;
                  return null;
                }}
              />
            </UserContext.Provider>
          </MemoryRouter>
        </MockedProvider>,
      );

      fireEvent.click(screen.getByTestId(r.testid));
      expect(testLocation.pathname).toBe(r.uri);
    });
  });
  // On les implémentera quand les composants seront créés
  xtest('/ajouter-une-fiche', () => {});
  xtest('/rechercher', () => {});
});

xdescribe('Les routes du site réservé profs ne sont pas accessible étant connecté comme élève', () => {
  test('/ma-promotion', () => {});
  test('/ajouter-un-élève', () => {});
  test('/ajouter-une-promotion', () => {});
});

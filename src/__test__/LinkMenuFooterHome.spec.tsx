import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import App from '../App';
import UserContext from '../utils/UserContext';

const defaultUser = {
  id: '1',
  firstname: 'John',
  lastname: 'Doe',
  isTeacher: false,
  email: 'nicolas.legrand@aze.com',
  classroom: {
    name: 'Wild Code School',
  },
};

const Wrapper = ({ children }: any) => (
  <UserContext.Provider value={defaultUser}>{children}</UserContext.Provider>
);

describe('Home Teacher', () => {
  test('It redirect to file studies with click on file studies button ', async () => {
    let testLocation = { pathname: '' };
    render(
      <MemoryRouter>
        <App />
        <Route
          path="*"
          render={({ location }) => {
            console.log(location);
            testLocation = location;
            return null;
          }}
        />
      </MemoryRouter>,
      { wrapper: Wrapper },
    );
    await waitFor(() => screen.getByTestId('yellow-btn'));
    act(() => {
      fireEvent.click(screen.getByTestId('yellow-btn'));
    });
    expect(testLocation.pathname).toBe('/mes-fiches-de-revisions');
  });

  test('It redirect to Forum with click on Forum button ', async () => {
    let testLocation = { pathname: '' };
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
        <Route
          path="*"
          render={({ location }) => {
            testLocation = location;
            return null;
          }}
        />
      </MemoryRouter>,
      { wrapper: Wrapper },
    );
    await waitFor(() => screen.getByTestId('blue-btn'));
    act(() => {
      fireEvent.click(screen.getByTestId('blue-btn'));
    });
    expect(testLocation.pathname).toBe('/forum');
  });

  xtest('It redirect to my space with click on my space button ', async () => {
    let testLocation = { pathname: '' };
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
        <Route
          path="*"
          render={({ location }) => {
            testLocation = location;
            return null;
          }}
        />
      </MemoryRouter>,
      { wrapper: Wrapper },
    );
    await waitFor(() => screen.getByTestId('green-btn'));
    act(() => {
      fireEvent.click(screen.getByTestId('green-btn'));
    });
    expect(testLocation.pathname).toBe('/mon-espace');
  });
});

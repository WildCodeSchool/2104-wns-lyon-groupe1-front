import { render, screen, fireEvent, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter, Route } from 'react-router-dom';
import App from '../App';
import { LOGIN } from '../utils/graphqlRequest';

const validUser = {
  email: 'student@student.fr',
  password: 'Password13!',
};

const mocks = [
  {
    request: {
      query: LOGIN,
      variables: {
        mail: validUser.email,
        password: validUser.password,
      },
    },
    result: {
      data: {
        user: {
          id: '1',
          firstname: 'John',
          lastname: 'Doe',
          isTeacher: false,
          mail: validUser.email,
          classroom: [
            {
              name: 'Développement web Lyon',
              year: '2021/2022',
              classroomId: '1',
            },
            {
              name: 'Développement web Marseille',
              year: '2021/2022',
              classroomId: '2',
            },
          ],
        },
      },
    },
  },
];

describe('Connexion', () => {
  test('Je peux me connecter à mon compte utilisateur et être redirigé sur le choix des promotions', async () => {
    let testLocation = { pathname: '' };

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <App />
          <Route
            path="*"
            render={({ location }) => {
              testLocation = location;
              return null;
            }}
          />
        </MemoryRouter>
      </MockedProvider>,
    );

    fireEvent.change(screen.getByTestId('input-mail'), {
      target: { value: validUser.email },
    });

    fireEvent.change(screen.getByTestId('input-password'), {
      target: { value: validUser.password },
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-connect'));

      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText(/promotions/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('btn-promo-1'));

    expect(testLocation.pathname).toBe('/');
  });

  test('En oubliant de remplir un champ, un text me signale mon erreur', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </MockedProvider>,
    );

    fireEvent.change(screen.getByTestId('input-mail'), {
      target: { value: validUser.email },
    });

    fireEvent.click(screen.getByTestId('btn-connect'));

    expect(screen.getByTestId('info-form')).toHaveTextContent(
      'Les identifiants ne sont pas reconnus.',
    );
  });

  test('En me trompant dans mes identifiants, un text me signale mon erreur', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </MockedProvider>,
    );

    fireEvent.change(screen.getByTestId('input-mail'), {
      target: { value: validUser.email },
    });

    fireEvent.change(screen.getByTestId('input-password'), {
      target: { value: 'unvalidePaswword' },
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-connect'));

      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByTestId('info-form')).toHaveTextContent(
      'Les identifiants ne sont pas reconnus.',
    );
  });
});

import { render, screen, fireEvent, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter, Route } from 'react-router-dom';
import { UserContext } from '../utils/UserContext';
import { IUser } from '../utils/interface';
import App from '../App';
import { ALL_SUBJECTS_BY_CLASSROOM } from '../utils/graphqlRequest';
import Study from '../route/Study';
import { connectUserStudent } from './utils';

const mockData = {
  classroomId: '1',
  name: 'Développement Web Lyon',
  year: '2021/2022',
  subject: [
    {
      subjectId: '1',
      imageUrl: '/images/Node.js_logo.svg',
      name: 'NodeJS',
    },
    {
      subjectId: '2',
      imageUrl: '/images/logo-react-blue-1.svg',
      name: 'React',
    },
    {
      subjectId: '3',
      imageUrl: '/images/GraphQL_Logo.svg',
      name: 'GraphQL',
    },
    {
      subjectId: '4',
      imageUrl: '/images/javascript-logo.svg',
      name: 'Javascript',
    },
    {
      subjectId: '5',
      imageUrl: '/images/Angular_full_color_logo.svg',
      name: 'Angular',
    },
    {
      subjectId: '6',
      imageUrl: '/images/PHP-logo.svg',
      name: 'PHP',
    },
    {
      subjectId: '7',
      imageUrl: '/images/HTML5_logo_and_wordmark.svg',
      name: 'HTML5',
    },
  ],
};

const mocks = [
  {
    request: {
      query: ALL_SUBJECTS_BY_CLASSROOM,
      variables: {
        classroomId: mockData.classroomId,
      },
    },
    result: {
      data: mockData,
    },
  },
];

test('Il y a bien des matières affichées', async () => {
  let testLocation = { pathname: '/mes-matières' };
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/']}>
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

  await act(async () => {
    fireEvent.click(screen.getByTestId('yellow-btn'));
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  console.log(testLocation);
  await new Promise((resolve) => setTimeout(resolve, 0));

  mockData.subject.forEach((subject) => {
    const element = screen.getByTestId(subject.subjectId);
    expect(element).toBeInTheDocument();
  });
});

test('Si pas connecté alors pas de matière affichée', async () => {
  let testLocation = { pathname: '/mes-matières' };
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/']}>
        <UserContext.Provider
          value={{
            user: {},
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

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const subject of mockData.subject) {
    const element = screen.queryByTestId(subject.subjectId);
    expect(element).not.toBeInTheDocument();
  }
});

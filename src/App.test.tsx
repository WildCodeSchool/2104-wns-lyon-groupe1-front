import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import App from './App';

test('renders learn react link', () => {
  render(
    <MemoryRouter>
      <MockedProvider>
        <App />
      </MockedProvider>
    </MemoryRouter>,
  );
});

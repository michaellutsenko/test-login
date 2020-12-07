import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AccountActivation from './AccountActivation';
import Login from './Login';
import PasswordReset from './PasswordReset';

import { BrowserRouter } from 'react-router-dom';
import StorageContext from '../../storage';

describe('Account Activation', () => {
  beforeAll(() => {
    window.alert = jest.fn();
  });

  beforeEach(() => {
    render(<AccountActivation />);
  });

  afterEach(() => cleanup());

  test('renders all required controls', () => {
    // Checking if email input exists
    const emailInput = screen.queryByPlaceholderText('Email');
    expect(emailInput).toBeInTheDocument();

    // It should also be disabled
    expect(emailInput).toBeDisabled();

    // Checking password input
    expect(screen.queryByPlaceholderText('Password')).toBeInTheDocument();

    // Checking if submit button exists
    expect(screen.queryByText('Submit')).toBeInTheDocument();
  });

  test('validates fields and shows validation errors', async () => {
    userEvent.click(screen.getByText('Submit'));

    // Testing it asynchronously due to how react-hook-form works
    // Believe me, it's worth it, try it if you haven't
    await waitFor(() =>
      expect(screen.queryByText('Password is required')).toBeInTheDocument()
    );

    userEvent.type(screen.getByPlaceholderText('Password'), 'asd');
    await waitFor(() => {
      expect(
        screen.queryByText('Password must contain at least 6 symbols')
      ).toBeInTheDocument();
    });
  });

  test('correctly passes entered data to API', async () => {
    userEvent.type(screen.getByPlaceholderText('Password'), 'asdasd');
    userEvent.click(screen.getByText('Submit'));

    // Now, it's difficult to see the results without having mocked the API
    // However, we know that the results must appear in localStorage. Bingo!

    await waitFor(() => expect(localStorage.getItem('password')).toBeTruthy());
    expect(localStorage.getItem('password')).toBe('asdasd');
  });
});

describe('Login', () => {
  beforeAll(() => {
    window.alert = jest.fn();
    localStorage.setItem('password', 'asdasd');
  });

  const storeMock = {
    token: '',
    setToken: jest.fn(),
  };

  beforeEach(() => {
    // This one will require some fiddling as it uses context and <Link>
    render(
      <BrowserRouter>
        <StorageContext.Provider value={storeMock}>
          <Login />
        </StorageContext.Provider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  // I see no point in repeating the test for correct rendering
  // But it should be done on an actual project

  test('validates fields and shows validation errors', async () => {
    userEvent.click(screen.getByText('Sign in'));
    await waitFor(() => {
      expect(screen.queryByText('Email is required')).toBeInTheDocument();
      expect(screen.queryByText('Password is required')).toBeInTheDocument();
    });

    userEvent.type(
      screen.getByPlaceholderText('Email'),
      'john_doe@somemail.com'
    );
    userEvent.type(screen.getByPlaceholderText('Password'), 'asd');
    await waitFor(() => {
      expect(
        screen.queryByText('Password must contain at least 6 symbols')
      ).toBeInTheDocument();
    });
  });

  test('sends correct data to the API and updates token', async () => {
    userEvent.type(
      screen.getByPlaceholderText('Email'),
      'john_doe@somemail.com'
    );
    userEvent.type(screen.getByPlaceholderText('Password'), 'asdasd');
    userEvent.click(screen.getByText('Sign in'));

    // But now that we have a mock, we can just check it
    await waitFor(() => {
      // Checking that the function was called, therefore token updated
      expect(storeMock.setToken).toHaveBeenCalledTimes(1);
      // Checking if the token actually had a value
      expect(storeMock.setToken.mock.calls[0][0]).toBeTruthy();
    });
  });
});

describe('Password Reset', () => {
  beforeAll(() => {
    window.alert = jest.fn();
  });

  beforeEach(() => {
    // PasswordReset has a <Link> in it, therefore wrapping it with a router
    render(
      <BrowserRouter>
        <PasswordReset />
      </BrowserRouter>
    );
  });

  afterEach(() => cleanup());

  test('validates fields and shows validation errors', async () => {
    userEvent.click(screen.getByText('Submit'));
    await waitFor(() =>
      expect(screen.queryByText('Email is required')).toBeInTheDocument()
    );

    userEvent.type(screen.getByPlaceholderText('Email'), 'aaabbbccc');
    await waitFor(() => {
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
      expect(screen.queryByText('Invalid email')).toBeInTheDocument();
    });
  });

  test('shows the magic link after entering email', async () => {
    userEvent.type(
      screen.getByPlaceholderText('Email'),
      'john_doe@somemail.com'
    );
    userEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.queryByText(/magic link/)).toBeInTheDocument();
      expect(screen.queryByText(/\/activation\/\w+/)).toBeInTheDocument();
    });
  });
});

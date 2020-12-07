// This module emulates API calls;
import { generateRandomString } from './utils';

/**
 * Emulate activating a new account.
 * @param {Object} payload Account activation form data
 */
export const activateAccount = async (payload) => {
  // I emphasise that passwords MUST NOT be sent as they are
  // They must always be encrypted either manually or by using HTTPS.
  // However, as this is a prototype, I will not implement an encryption method
  localStorage.setItem('password', payload.password);
  return true;
};

/**
 * Emulate signing in.
 * @param {Object} payload Email and password
 */
export const signIn = async (payload) => {
  // The simplest authentication method possible
  // Obviously, on a real project it would've been more complicated
  // Once again, the password in a real world scenario MUST be encrypted
  // or sent through a protected network
  if (
    payload.password === localStorage.getItem('password') &&
    payload.email === 'john_doe@somemail.com'
  ) {
    // Normally, here the server would return some sort of access token
    // though, it may be different depending on the method of authorization

    // Emulating token generation
    const token = generateRandomString();
    localStorage.setItem('token', token);

    // Emulating server's response
    return {
      status: 200,
      data: { token },
    };
  } else {
    throw false;
  }
};

/**
 * Emulate signing out.
 */
export const signOut = async () => {
  // Normally we would send the token with the request to sign out
  // But for simplicity's sake let's imagine the token

  // As the token is no longer active, resetting it in the storage
  localStorage.setItem('token', null);
  return true;
};

/**
 * Emulate requesting a new magic link.
 * Generates a random string.
 * @param {string} email User's email
 */
export const requestMagicLink = async (email) => {
  // Resetting current password
  localStorage.setItem('password', null);
  return generateRandomString();
};

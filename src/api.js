// This module emulates API calls;
import { user } from './storage';

/**
 * Emulate activating a new account.
 * @param {Object} payload Account activation form data
 */
export const activateAccount = async (payload) => {
  // Normally here we would send encrypted (through use of HTTPS or manually)
  // user's credentials and on a successful response, we would update user's data
  // in the storage and return a positive result, allowing to proceed.
  //
  // However, this is not the goal of the test task, so I'll emulate the whole process
  // as well as server responses, where needed.

  user.updateUserData({
    firstName: payload.firstName,
    lastName: payload.lastName,
  });
  localStorage.setItem('email', payload.email);

  // I emphasise that the password should NEVER be kept as is and it should be encrypted
  // For time's sake, I will not implement an encryption method
  localStorage.setItem('password', payload.password);
  return true;
};

/**
 * Emulate signing in.
 * @param {Object} payload Email and password
 */
export const signIn = async (payload) => {
  const savedEmail = localStorage.getItem('email');
  const savedPassword = localStorage.getItem('password');

  if (payload.mail === savedEmail && payload.password === savedPassword) {
    return true;
  } else {
    throw false;
  }
};

export const signOut = async () => {
  return true;
};

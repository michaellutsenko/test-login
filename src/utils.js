/**
 * Create a randomised string.
 * Used to emulate magic link tokens.
 * @returns {string} Randomised string
 */
export const generateRandomString = () =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '');

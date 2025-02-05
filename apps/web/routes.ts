/**
 * Array of public routes that don't require authentication
 */
export const publicRoutes = ['/'];

/**
 * An array of routes that are used for authentication These routes will redirect logged in users to /settings
 */
export const authRoutes = ['/auth/sign-in', '/auth/sign-up'];

/**
 * Routes that start with this prefix are used for API authentication purposes
 *  @type {string}
 * Prefix for authentication API endpoints
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect URL after a successful login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';

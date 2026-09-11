/** Shared constants for SauceDemo automation. */
export const BASE_URL = process.env.BASE_URL || 'https://www.saucedemo.com';

export const CREDENTIALS = {
  valid: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'standard_user',
    password: 'wrong_password',
  },
} as const;

export const MESSAGES = {
  invalidLogin:
    'Epic sadface: Username and password do not match any user in this service',
  orderCompleteHeader: 'Thank you for your order!',
  orderCompleteText:
    'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
} as const;

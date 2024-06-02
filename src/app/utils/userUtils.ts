import { UserData } from '../interfaces/interfaces';
import { putCallAPIWithToken } from '../api/put';
import { deleteCookie } from './cookiesUtils';

export const getUser = (): UserData | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const clearLoginStatus = () => {
  localStorage.removeItem('isLoggedIn');
  deleteCookie('session');
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
};

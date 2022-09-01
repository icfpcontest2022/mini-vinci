import api from './api';
import { newLoginRequest } from '../models/request/login';
import { newRegisterRequest } from '../models/request/register';
import { newRenewPasswordRequest } from '../models/request/renewPassword';
import { newSendResetLinkRequest } from '../models/request/sendResetLink';

export const login = async (
  email: string,
  password: string,
): Promise<string> => {
  const url = '/users/login';
  const res = await api.post(url, newLoginRequest(email, password));
  if (res.data?.token) {
    return res.data.token;
  }
  throw new Error('Unexpected error: no token received after login');
};

export const register = async (
  email: string,
  password: string,
  teamName: string,
): Promise<void> => {
  const url = '/users/register';
  await api.post(url, newRegisterRequest(email, password, teamName));
};

export const renewPassword = async (
  password: string,
  token: string,
): Promise<void> => {
  const url = '/users/password/renew';
  await api.post(url, newRenewPasswordRequest(password, token));
};

export const sendResetLink = async (email: string): Promise<void> => {
  const url = '/users/password/send-renew-email';
  await api.post(url, newSendResetLinkRequest(email));
};

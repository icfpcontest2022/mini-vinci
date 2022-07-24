import api from './api';
import { newLoginRequest } from '../models/request/login';
import { newRegisterRequest } from '../models/request/register';

export const login = async (
  email: string,
  password: string,
): Promise<string> => {
  const url = '/auth/login';
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
): Promise<string> => {
  const url = '/auth/register';
  const res = await api.post(
    url,
    newRegisterRequest(email, password, teamName),
  );
  if (res.data?.token) {
    return res.data.token;
  }
  throw new Error('Unexpected error: no token received after register');
};

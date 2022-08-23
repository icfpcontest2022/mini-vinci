import { AxiosRequestConfig } from 'axios';
import { isArray } from 'lodash';
import { setAuthToken } from '../utilities/request';
import { SupportHistory, supportHistoryFromResponse } from '../models/support';
import api from './api';

const supportEndpoint = '/support';

export const getSupportHistory = async (
  authToken: string,
): Promise<SupportHistory[]> => {
  let request: AxiosRequestConfig = {
    url: supportEndpoint,
    method: 'get',
    headers: {},
  };

  request = setAuthToken(request, authToken);

  const response = await api(request);
  if (!isArray(response?.data?.history)) {
    throw new Error('Unexpected error: response contains no "history" list');
  }

  return response.data.history.map((history: any) =>
    supportHistoryFromResponse(history),
  );
};

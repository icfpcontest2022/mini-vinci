import { AxiosRequestConfig } from 'axios';
import { newMakeSubmissionRequest } from '../models/request/submission';
import { setAuthToken } from '../utilities/request';
import api from './api';

export const makeNewSubmission = async (
  code: string,
  authToken: string,
): Promise<void> => {
  let request: AxiosRequestConfig = {
    url: '/submission/new',
    method: 'post',
    headers: {},
    data: newMakeSubmissionRequest(code),
  };

  request = setAuthToken(request, authToken);

  await api(request);
};

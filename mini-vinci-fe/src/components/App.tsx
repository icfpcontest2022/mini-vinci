import React, { useEffect } from 'react';
import { Box } from '@mui/material';

import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { authToken as authTokenAtom } from '../atoms/auth';

const App = (): JSX.Element => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useRecoilState(authTokenAtom);

  const initializeTokenFromStorage = () => {
    setAuthToken(localStorage.getItem('authToken'));
  };

  useEffect(initializeTokenFromStorage, []);
  useEffect(() => {
    if (authToken) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [authToken]);

  return <Box>Redirecting...</Box>;
};

export default App;

import { makeStyles } from 'tss-react/mui';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authToken as authTokenAtom } from '../../../atoms/auth';
import { selectedTab as selectedTabAtom } from '../../../atoms/tabs';
import { TabKind } from '../../../variables/tabs';
import AppHeader from '../../AppHeader';
import { isAuthTokenExpired } from '../../../utilities/auth';

const Support = (): JSX.Element => {
  const { classes } = useStyles();

  const navigate = useNavigate();

  const authToken = useRecoilValue(authTokenAtom);
  const setSelectedTab = useSetRecoilState(selectedTabAtom);

  useEffect(() => {
    if (isAuthTokenExpired(authToken)) {
      navigate('/login');
    }
  }, [authToken]);

  useEffect(() => {
    setSelectedTab(TabKind.SUPPORT);
    document.title = 'Support';
  }, []);

  return (
    <Box component='div' className={classes.mainContainer}>
      <AppHeader />
      Support page goes here
    </Box>
  );
};

const useStyles = makeStyles()(() => ({
  mainContainer: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },
}));

export default Support;

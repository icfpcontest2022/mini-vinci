import {
  Box,
  Button,
  Paper,
  Tab,
  Tabs,
  Theme,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { makeStyles } from 'tss-react/mui';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { authToken as authTokenAtom } from '../atoms/auth';
import { selectedTab as selectedTabAtom } from '../atoms/tabs';
import logo from '../assets/headerLogo.png';
import { TabKind, TabURL } from '../variables/tabs';
import { deleteAuthTokenFromStorage } from '../utilities/auth';

const AppHeader = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();

  const setAuthToken = useSetRecoilState(authTokenAtom);
  const [selectedTab, setSelectedTab] = useRecoilState(selectedTabAtom);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    switch (newValue) {
      case TabKind.DASHBOARD: {
        navigate(`/${TabURL.DASHBOARD}`);
        break;
      }
      case TabKind.PROBLEMS: {
        navigate(`/${TabURL.PROBLEMS}`);
        break;
      }
      case TabKind.ANNOUNCEMENTS: {
        navigate(`/${TabURL.ANNOUNCEMENTS}`);
        break;
      }
      case TabKind.SUPPORT: {
        navigate(`/${TabURL.SUPPORT}`);
        break;
      }
      case TabKind.PLAYGROUND: {
        navigate(`/${TabURL.PLAYGROUND}`);
        break;
      }
      default: {
        navigate(`/${TabURL.DASHBOARD}`);
      }
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    deleteAuthTokenFromStorage();
    navigate(`/${TabURL.LOGIN}`);
  };

  return (
    <Paper className={classes.paper}>
      <img src={logo} alt='' width={60} />
      <Box component='div' className={classes.tabsContainer}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab
            label={
              <Typography className={classes.tabLabel}>Dashboard</Typography>
            }
            id='dashboard-tab'
          />
          <Tab
            label={
              <Typography className={classes.tabLabel}>Problems</Typography>
            }
            id='problems-tab'
          />
          <Tab
            label={
              <Typography className={classes.tabLabel}>
                Announcements
              </Typography>
            }
            id='announcements-tab'
          />
          <Tab
            label={
              <Typography className={classes.tabLabel}>Support</Typography>
            }
            id='support-tab'
          />
          <Tab
            label={
              <Typography className={classes.tabLabel}>Playground</Typography>
            }
            id='playground-tab'
          />
        </Tabs>
      </Box>
      <Box component='div' className={classes.horizontalSpacer} />
      <Button
        onClick={handleLogout}
        color='secondary'
        endIcon={<LogoutIcon />}
        style={{ textTransform: 'none' }}
      >
        Logout
      </Button>
    </Paper>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  paper: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    paddingRight: theme.spacing(1),
  },
  tabsContainer: {
    height: 'fit-content',
    marginBottom: 0,
    marginTop: 'auto',
  },
  tabLabel: {
    textTransform: 'none',
  },
  horizontalSpacer: {
    flexGrow: 1,
  },
}));

export default AppHeader;

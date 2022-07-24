import { Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import AppHeader from './AppHeader';
import { selectedTab as selectedTabAtom } from '../atoms/tabs';
import { TabKind } from '../variables/tabs';

const Announcements = (): JSX.Element => {
  const { classes } = useStyles();

  const setSelectedTab = useSetRecoilState(selectedTabAtom);

  useEffect(() => {
    setSelectedTab(TabKind.ANNOUNCEMENTS);
    document.title = 'Announcements';
  }, []);

  return (
    <Box component='div' className={classes.mainContainer}>
      <AppHeader />
      Announcements page goes here
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

export default Announcements;

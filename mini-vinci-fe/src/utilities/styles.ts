import { makeStyles } from 'tss-react/mui';
import { createTheme } from '@mui/material/styles';

export const sharedColors = {
  black: '#000000',
  blue1: '#E3F2FD',
  blue4: '#2196F3',
  blue5: '#1976D2',
  blue6: '#0D47A1',
  blue7: '#001D6C',
  gray1: '#FAFAFA',
  gray2: '#F5F5F5',
  gray3: '#ececec',
  gray4: '#ADADAD',
  gray5: '#757575',
  gray6: '#424242',
  gray7: '#232323',
  gray8: '#EEEEEE',
  purple1: '#F3E5F5',
  statusGreen: '#008A00',
  statusGreenLightest: '#EBF6EB',
  statusRed: '#AE0000',
  statusRedLightest: '#F7EDED',
  statusYellow: '#EAB600',
  statusYellowDark: '#382C00',
  statusYellowLightest: '#FFFEF1',
  white: '#FFFFFF',
  infoYellow: '#EAB600',
  yellowLightest: '#FFFEF1',
  yellowDark: '#382C00',
};

export const sharedMeasurements = {
  drawerWidth: 280,
};

export const useSharedStyles = makeStyles()(() => ({
  iconColor: {
    color: sharedColors.gray4,
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '13px',
    textTransform: 'none',
  },
  caption: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '11px',
    lineHeight: '13px',
  },
  h2: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: '20px',
    lineHeight: '33px',
  },
  h5: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
  },
  h6: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '19px',
  },
  body1: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
  },
  body2: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
  },
  overline: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '10px',
    lineHeight: '12px',
  },
  subtitle1: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '19px',
  },
  subtitle2: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '13px',
    lineHeight: '15px',
  },
  hidden: {
    display: 'none',
  },
}));

const timePickerColors = {
  background: sharedColors.white,
  main: sharedColors.blue5,
  secondary: sharedColors.blue5,
  mainShadow: sharedColors.blue5,
  el2: sharedColors.gray4,
  el3: sharedColors.blue5,
};

export const timePickerTheme = createTheme({
  palette: {
    primary: {
      main: timePickerColors.main,
    },
  },
});

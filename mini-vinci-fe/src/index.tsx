import React from 'react';
import ReactDOM from 'react-dom/client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'material-react-toastify/dist/ReactToastify.css';

import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ToastContainer } from 'material-react-toastify';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import App from './components/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={createTheme()}>
        <BrowserRouter>
          <Routes>
            <Route path='login' element={<Login />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='*' element={<App />} />
          </Routes>
          <ToastContainer
            position='top-center'
            autoClose={6000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
          />
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
);

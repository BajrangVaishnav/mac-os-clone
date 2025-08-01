import './index.css';

import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

import App from './App.tsx';

// const clientId = '489829446357-70isl7emn53mv58o8qqqsa2p0qqbflml.apps.googleusercontent.com';
createRoot(document.getElementById('root')!).render(

  <StrictMode>
      <BrowserRouter>  {/* Wrap your App component with BrowserRouter */}
        <App />
      </BrowserRouter>
  </StrictMode>,
);

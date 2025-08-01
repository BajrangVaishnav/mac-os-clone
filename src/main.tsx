import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from './App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from "./AuthContext.tsx";
// const clientId = '489829446357-70isl7emn53mv58o8qqqsa2p0qqbflml.apps.googleusercontent.com';
createRoot(document.getElementById('root')!).render(

  <StrictMode>
      <BrowserRouter>  {/* Wrap your App component with BrowserRouter */}
      <AuthProvider>
    <GoogleOAuthProvider clientId={import.meta.env.GOOGLE_CLIENTID}>
        <App />
    </GoogleOAuthProvider>
    </AuthProvider>
      </BrowserRouter>
  </StrictMode>,
);

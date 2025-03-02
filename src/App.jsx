import { useState } from 'react';
import './App.css';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import SignUpPage from './pages/signUpPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHomePage from './pages/adminHomePage';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ProtectedRoute from './components/protectedRoute'; 

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <BrowserRouter>
        <Toaster position="top-right" />
        <GoogleOAuthProvider clientId="474190677487-al5kcu80p13msbvmmf8tu52d8la5bgie.apps.googleusercontent.com">
          <Routes path="/*">
            <Route path="/*" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup"element={<SignUpPage/>}/>
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute adminOnly>
                  <AdminHomePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './hooks/Auth';
import ProtectedRoute from './components/Protected';
import Signup from './pages/Signup';
import User from './pages/User';

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/login"
              element={
                <>
                  <Signup />
                </>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App

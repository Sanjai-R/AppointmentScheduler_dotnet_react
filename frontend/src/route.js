import { SignupPage } from './pages/Auth/Signup';
import LoginPage from './pages/Auth/Login';
import AppointmentsList from './pages/HomePage';

const AppRoutes = [
  {
    path: '/',
    element: <AppointmentsList />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
];

export default AppRoutes;

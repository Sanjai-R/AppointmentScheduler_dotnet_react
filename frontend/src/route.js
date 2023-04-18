import { SignupPage } from './pages/Auth/Signup';
import LoginPage from './pages/Auth/Login';
import AppointmentsList from './pages/HomePage';
import CreateAppointmentPage from './pages/CreateAppointment';
import UpdateAppointmentPage from './pages/UpdateAppointment';
import EditSignupPage from './pages/Auth/Update';
import ChangePasswordPage from './pages/Auth/ChangePassword';
import ResetPasswordPage from './pages/Auth/ChangePassword';
import ForgotPassword from './pages/Auth/ForgotPassword';

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
    path: '/create',
    element: <CreateAppointmentPage />,
  },

  {
    path: '/update/:id',
    element: <UpdateAppointmentPage />,
  },

  {
    path: '/editProfile/:id',
    element: <EditSignupPage />,
  },
  {
    path: '/changePassword',
    element: <ResetPasswordPage />,
  },
  {
    path: '/forgetPassword',
    element: <ForgotPassword />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
];

export default AppRoutes;

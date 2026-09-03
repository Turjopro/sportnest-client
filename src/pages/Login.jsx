import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../context/useAuth';
import usePageTitle from '../hooks/usePageTitle';

const Login = () => {
  usePageTitle('Login');
  const { loginUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then(() => {
        toast.success('Logged in successfully');
        navigate(from, { replace: true });
      })
      .catch(() => {
        setErrorMsg('Invalid email or password. Please try again.');
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success('Logged in successfully');
        navigate(from, { replace: true });
      })
      .catch(() => {
        toast.error('Google login failed. Please try again.');
      });
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          Login to SportNest
        </h1>
        <p className="mt-1 text-center text-sm text-gray-500">
          Book your next game in just a few clicks
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
            />
          </div>

          {errorMsg && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-primary py-2.5 font-semibold text-white transition hover:bg-primary/90"
          >
            Login
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200"></div>
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <FcGoogle className="text-xl" /> Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

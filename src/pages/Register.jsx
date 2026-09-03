import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../context/useAuth';

const Register = () => {
  const { createUser, updateUserProfile, googleLogin, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    // Password validation: 6+ chars, one uppercase, one lowercase
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);

    if (password.length < 6) {
      return setErrorMsg('Password must be at least 6 characters long.');
    }
    if (!hasUpper) {
      return setErrorMsg('Password must contain at least one uppercase letter.');
    }
    if (!hasLower) {
      return setErrorMsg('Password must contain at least one lowercase letter.');
    }

    createUser(email, password)
      .then(() => {
        updateUserProfile({ displayName: name, photoURL })
          .then(() => {
            // sign the user out so they log in fresh from the Login page
            logoutUser().finally(() => {
              toast.success('Registration successful! Please login.');
              navigate('/login');
            });
          })
          .catch(() => {
            toast.success('Registration successful! Please login.');
            navigate('/login');
          });
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          setErrorMsg('This email is already registered.');
        } else {
          setErrorMsg('Registration failed. Please try again.');
        }
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success('Logged in successfully');
        navigate('/');
      })
      .catch(() => {
        toast.error('Google login failed. Please try again.');
      });
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          Create an Account
        </h1>
        <p className="mt-1 text-center text-sm text-gray-500">
          Join SportNest and start booking today
        </p>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Your full name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
            />
          </div>
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
              Photo URL
            </label>
            <input
              type="text"
              name="photoURL"
              required
              placeholder="https://example.com/photo.jpg"
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
            <p className="mt-1 text-xs text-gray-400">
              At least 6 characters, one uppercase & one lowercase letter.
            </p>
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
            Register
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
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

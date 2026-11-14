
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { loginAPI } from '../../services/allApi';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginAPI(loginDetails);

      if (!response.data.token) {
        setError('Login response did not include an authentication token.');
        return;
      }

      // Save token and user details
      localStorage.setItem('token', response.data.token);
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 border-slate-800 shadow-2xl bg-white/98">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Welcome Back
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Sign in to your personal vehicle maintenance dashboard
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">

        {location.state?.message && (
          <p className="text-sm text-emerald-600 text-center">
            {location.state.message}
          </p>
        )}

        <div className="w-full">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Email Address <span className="text-rose-500">*</span>
          </label>

          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <FiMail className="w-4 h-4" />
            </div>

            <input
              type="email"
              name="email"
              value={loginDetails.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 pl-10 border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-slate-700">
              Password
            </label>
          </div>

          <div className="w-full">
            <div className="relative rounded-xl shadow-xs">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <FiLock className="w-4 h-4" />
              </div>

              <input
                type="password"
                name="password"
                value={loginDetails.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full text-sm rounded-xl border transition-all duration-150 px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 pl-10 border-slate-200 hover:border-slate-300 focus:border-[#0F9D91] focus:ring-[#0F9D91]/20"
              />
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-rose-500 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer bg-[#0F9D91] hover:bg-[#0D887E] text-white shadow-sm focus:ring-[#0F9D91] text-base px-5 py-2.5 gap-2.5 mt-2 w-full"
        >
          <FiArrowRight className="w-4 h-4 shrink-0" />
          {loading ? 'Signing In...' : 'Sign In to Dashboard'}
        </button>

      </form>

      <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
        Don&apos;t have an account?{' '}
        <Link
          to="/register"
          className="font-semibold text-[#0F9D91] hover:underline"
        >
          Create account
        </Link>
      </div>
    </div>
  );
}

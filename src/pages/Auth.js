import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const inputClass = 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-[15px] outline-none transition-colors focus:border-brand-purple box-border';

const Auth = () => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register, confirmRegistration, saveUserToDb, demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try { await login(email, password); navigate('/'); }
    catch (err) { setError(err.message || 'Login failed.'); }
    finally { setLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try { await register(email, password, name); setMode('confirm'); }
    catch (err) { setError(err.message || 'Registration failed.'); }
    finally { setLoading(false); }
  };

  const handleConfirm = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      await confirmRegistration(email, confirmCode);
      await login(email, password);
      await saveUserToDb(email, name);
      navigate('/');
    }
    catch (err) { setError(err.message || 'Confirmation failed.'); }
    finally { setLoading(false); }
  };

  const handleDemoLogin = () => { demoLogin('demo@elecshop.com', 'Demo User'); navigate('/'); };

  return (
    <main className="min-h-[calc(100vh-70px)] flex items-center justify-center p-10 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white rounded-3xl p-10 w-full max-w-[440px] shadow-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-4xl block mb-3">⚡</span>
          <h1 className="text-2xl font-extrabold text-brand-dark mb-2">
            {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Create Account' : 'Verify Email'}
          </h1>
          <p className="text-sm text-gray-400">
            {mode === 'login' ? 'Sign in to your Elec Shop account' : mode === 'register' ? 'Join Elec Shop for the best deals' : 'Enter the verification code sent to your email'}
          </p>
        </div>

        {error && <div className="bg-red-500/10 text-red-500 px-4 py-3 rounded-xl text-sm mb-5 border border-red-500/15" role="alert">{error}</div>}

        {mode === 'login' && (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-brand-dark mb-1.5">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required autoComplete="email" className={inputClass} />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-semibold text-brand-dark mb-1.5">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required autoComplete="current-password" className={inputClass} />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3.5 gradient-btn rounded-xl text-base font-bold cursor-pointer border-none mt-2 hover:opacity-90 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        )}

        {mode === 'register' && (
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold text-brand-dark mb-1.5">Full Name</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required autoComplete="name" className={inputClass} />
            </div>
            <div className="mb-4">
              <label htmlFor="reg-email" className="block text-sm font-semibold text-brand-dark mb-1.5">Email</label>
              <input id="reg-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required autoComplete="email" className={inputClass} />
            </div>
            <div className="mb-4">
              <label htmlFor="reg-password" className="block text-sm font-semibold text-brand-dark mb-1.5">Password</label>
              <input id="reg-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 8 characters" required minLength={8} autoComplete="new-password" className={inputClass} />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3.5 gradient-btn rounded-xl text-base font-bold cursor-pointer border-none mt-2 hover:opacity-90 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        )}

        {mode === 'confirm' && (
          <form onSubmit={handleConfirm}>
            <div className="mb-4">
              <label htmlFor="code" className="block text-sm font-semibold text-brand-dark mb-1.5">Verification Code</label>
              <input id="code" type="text" value={confirmCode} onChange={(e) => setConfirmCode(e.target.value)} placeholder="Enter 6-digit code" required className={inputClass} />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3.5 gradient-btn rounded-xl text-base font-bold cursor-pointer border-none mt-2 hover:opacity-90 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0">
              {loading ? 'Verifying...' : 'Verify & Sign In'}
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-4 text-[13px] text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button onClick={handleDemoLogin} className="w-full py-3.5 bg-gray-100 border-2 border-gray-200 rounded-xl text-[15px] font-semibold cursor-pointer text-brand-dark hover:border-brand-purple hover:bg-brand-purple/5 transition-all">
          🚀 Continue with Demo Account
        </button>

        <div className="text-center mt-5 text-sm text-gray-400">
          {mode === 'login' ? (
            <p>Don't have an account? <button onClick={() => { setMode('register'); setError(''); }} className="bg-transparent border-none text-brand-purple font-semibold cursor-pointer text-sm hover:underline">Sign Up</button></p>
          ) : mode !== 'confirm' ? (
            <p>Already have an account? <button onClick={() => { setMode('login'); setError(''); }} className="bg-transparent border-none text-brand-purple font-semibold cursor-pointer text-sm hover:underline">Sign In</button></p>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default Auth;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { http } from '../api/http.js';
import { API } from '../api/urls.js';
import toast from 'react-hot-toast';
import { useAuth } from '../state/AuthContext.jsx';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await http.post(API.AUTH.REGISTER, { name, email, password });
      setToken(res.data.data.token);
      setUser(res.data.data.user);
      toast.success('Registered');
      navigate('/');
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Register failed');
    }
  }

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
        </div>
        <form className="mt-8 space-y-6 bg-white p-8 shadow-xl rounded-lg" onSubmit={submit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input name="name" type="text" required className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <input name="email" type="email" autoComplete="email" required className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <input name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Create account</button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600">Have an account? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Login here</Link></p>
      </div>
    </div>
  );
}

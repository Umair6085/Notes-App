import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../component/feature/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from "../../component/spinner/Spinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    let user = { email, password };

    try {
      await dispatch(login(user)).unwrap();
      navigate('/');
    } catch (error) {
      console.error("Login failed: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="w-full max-w-md px-6 py-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring focus:ring-blue-500`}
              placeholder="user@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring focus:ring-blue-500`}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="mt-6">
            {loading ? (
              <Spinner />
            ) : (
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Login
              </button>
            )}
          </div>
        </form>
        
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?
          <button
            onClick={handleRegister}
            className="text-blue-500 ml-1 hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

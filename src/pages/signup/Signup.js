import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../component/feature/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../../component/spinner/Spinner"


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!phone) errors.phone = "Phone number is required";
    if (!address.trim()) errors.address = "Address is required";
    if (!gender) errors.gender = "Gender is required";
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);

    let user = {
      name,
      email,
      password,
      phone,
      address,
      gender,
    };

    try {
      await dispatch(signup(user)).unwrap();
      navigate('/'); 
    } catch (error) {
      console.error("Signup failed: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };
  
  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-lg p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              className={`w-full px-4 py-2 border ${error.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            {error.name && <p className="text-red-500 text-xs mt-1">{error.name}</p>}
          </div>

          <div>
            <input
              type="email"
              className={`w-full px-4 py-2 border ${error.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && <p className="text-red-500 text-xs mt-1">{error.email}</p>}
          </div>

          <div>
            <input
              type="password"
              className={`w-full px-4 py-2 border ${error.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && <p className="text-red-500 text-xs mt-1">{error.password}</p>}
          </div>

          <div>
            <input
              type="tel"
              className={`w-full px-4 py-2 border ${error.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            {error.phone && <p className="text-red-500 text-xs mt-1">{error.phone}</p>}
          </div>

          <div>
            <input
              type="text"
              className={`w-full px-4 py-2 border ${error.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
            {error.address && <p className="text-red-500 text-xs mt-1">{error.address}</p>}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Gender:</p>
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  className="form-radio text-blue-500"
                  onChange={() => setGender("male")}
                />
                <label htmlFor="male" className="ml-2">Male</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  className="form-radio text-blue-500"
                  onChange={() => setGender("female")}
                />
                <label htmlFor="female" className="ml-2">Female</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  id="other"
                  value="other"
                  className="form-radio text-blue-500"
                  onChange={() => setGender("other")}
                />
                <label htmlFor="other" className="ml-2">Other</label>
              </div>
            </div>
            {error.gender && <p className="text-red-500 text-xs mt-1">{error.gender}</p>}
          </div>

          <div className="mt-6">
            {loading ? (
              <Spinner />
            ) : (
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Submit
              </button>
            )}
          </div>
        </form>
        
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?
          <button
            onClick={handleLogin}
            className="text-blue-500 ml-1 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



    
    if (!email || !password || regex) {
      setError('Both email and password are required!');
      return;
    }

    setError('');
    setLoading(true);

   
    setTimeout(() => {
      setLoading(false);
      console.log('Email:', email);
      console.log('Password:', password);
      alert(`${isSignup ? 'Sign up' : 'Login'} successful!`);
    }, 2000);
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          {isSignup ? 'Sign Up' : 'Login'}
        </h2>

      
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* If it's signup, show additional fields like "Confirm Password" */}
          {isSignup && (
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-3 ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-3 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"></path>
              </svg>
            ) : (
              isSignup ? 'Sign Up' : 'Login'
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <a
            href="#"
            className="text-sm text-blue-500 hover:underline"
            onClick={toggleForm}
          >
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </a>
        </div>

        <div className="text-center mt-4">
          <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

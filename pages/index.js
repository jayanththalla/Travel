import { useState, useEffect } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track if it's client-side

  useEffect(() => {
    setIsClient(true); // Set isClient to true once component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Registration failed');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
        <h1 className="text-4xl font-extrabold mb-4 animate-pulse">🎉 Registration Successful!</h1>
        <p className="text-lg mb-6">Welcome aboard, {formData.name}! We&apos;re excited to have you.</p>
        <a
          href="/layout"
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100"
        >
          Go to Dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      {/* Video Background rendered only on the client */}
      {isClient && (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/register.mp4"
          autoPlay
          loop
          muted
        />
      )}

      {/* Overlay to darken video */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      {/* Registration Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white dark:bg-100 p-8 rounded-lg shadow-2xl w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-black">Register</h1>

        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black transition"
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-black mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-blue-500"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-purple-600 transition font-semibold"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        {/* Link to Login */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-900 mt-4">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-blue-500 font-semibold hover:underline"
          >
            Log in here
          </a>
        </p>
      </form>
    </div>
  );
}

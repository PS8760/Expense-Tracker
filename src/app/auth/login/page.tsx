'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // Redirect after successful login
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <h2 className="text-white text-3xl font-semibold mb-6">Login to Your Account</h2>
      <input
        className="mb-4 px-4 py-2 rounded bg-gray-800 text-white w-80"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mb-4 px-4 py-2 rounded bg-gray-800 text-white w-80"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        onClick={handleLogin}
      >
        Login
      </button>
      {error && <p className="text-red-400 mt-4">{error}</p>}
    </div>
  );
}

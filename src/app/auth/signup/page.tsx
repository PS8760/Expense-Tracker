'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        salary: null,
        expenses: [],
      });

      router.push('/dashboard'); // Redirect after successful signup
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <h2 className="text-white text-3xl font-semibold mb-6">Create an Account</h2>
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
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={handleSignup}
      >
        Sign Up
      </button>
      {error && <p className="text-red-400 mt-4">{error}</p>}
    </div>
  );
}

'use client';
import React, { useState } from 'react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Create Account</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />

      <button
        onClick={handleSignup}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#6B46C1',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Sign Up
      </button>

      {message && (
        <p style={{ marginTop: '20px', color: 'green' }}>{message}</p>
      )}
    </div>
  );
}
'use client';
import { useState } from 'react';

export default function CreatePin() {
  const [form, setForm] = useState({
    title: '',
    imageUrl: '',
    affiliateUrl: '',
    category: '',
    userId: '', // Replace with actual user ID
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/pins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log('Created Pin:', data);
    alert('Pin created successfully!');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <input name="imageUrl" placeholder="Image URL" onChange={handleChange} required />
      <input name="affiliateUrl" placeholder="Affiliate URL" onChange={handleChange} required />
      <input name="category" placeholder="Category" onChange={handleChange} required />
      <input name="userId" placeholder="User ID" onChange={handleChange} required />
      <button type="submit">Create Pin</button>
    </form>
  );
}
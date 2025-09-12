'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function CreatePin() {
  const [title, setTitle] = useState('')
  const [imageurl, setImageurl] = useState('')
  const [affiliateurl, setAffiliateurl] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!title || !imageurl || !affiliateurl) {
      setStatus('❌ All fields are required')
      return
    }

    const { error } = await supabase
      .from('Pin')
      .insert([
        {
          title,
          text: title, // optional: matches your Supabase 'text' column
          imageUrl: imageurl, // ✅ matches your schema
          affiliateUrl: affiliateurl // ✅ matches your schema
        }
      ], { returning: 'minimal' }) // avoids SELECT policy issues

    console.log('Insert error:', error)

    if (error) {
      setStatus('❌ Failed to submit pin')
    } else {
      setStatus('✅ Pin submitted successfully!')
      setTitle('')
      setImageurl('')
      setAffiliateurl('')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
      <h2>Create a New Pin</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageurl}
        onChange={(e) => setImageurl(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Affiliate URL"
        value={affiliateurl}
        onChange={(e) => setAffiliateurl(e.target.value)}
        required
      />

      <button type="submit">Submit Pin</button>
      {status && <p>{status}</p>}
    </form>
  )
}
import React, { useState } from 'react';

const CreateShortlink = () => {
  const [slug, setSlug] = useState('');
  const [iosFallback, setIosFallback] = useState('');
  const [androidFallback, setAndroidFallback] = useState('');
  const [webFallback, setWebFallback] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const shortlinkData = {
      slug,
      ios: { fallback: iosFallback },
      android: { fallback: androidFallback },
      web: { fallback: webFallback },
    };

    try {
      const response = await fetch('/api/shortlinks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shortlinkData),
      });

      if (response.ok) {
        console.log('Shortlink created successfully');
        // Reset form fields
        setSlug('');
        setIosFallback('');
        setAndroidFallback('');
        setWebFallback('');
      } else {
        console.error('Error creating shortlink:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating shortlink:', error);
    }
  };

  return (
    <div>
      <h1>Create Shortlink</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Slug:
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </label>
        <label>
          iOS Fallback:
          <input
            type="text"
            value={iosFallback}
            onChange={(e) => setIosFallback(e.target.value)}
            required
          />
        </label>
        <label>
          Android Fallback:
          <input
            type="text"
            value={androidFallback}
            onChange={(e) => setAndroidFallback(e.target.value)}
            required
          />
        </label>
        <label>
          Web Fallback:
          <input
            type="text"
            value={webFallback}
            onChange={(e) => setWebFallback(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateShortlink;

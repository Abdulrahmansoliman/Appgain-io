import React, { useState, useEffect } from 'react';

const UpdateShortlink = ({ match }) => {
  const [slug, setSlug] = useState('');
  const [iosFallback, setIosFallback] = useState('');
  const [androidFallback, setAndroidFallback] = useState('');
  const [webFallback, setWebFallback] = useState('');

  useEffect(() => {
    const fetchShortlink = async () => {
      try {
        const response = await fetch(`/api/shortlinks/<slug>${match.params.slug}`);
        if (response.ok) {
          const shortlink = await response.json();
          setSlug(shortlink.slug);
          setIosFallback(shortlink.ios.fallback);
          setAndroidFallback(shortlink.android.fallback);
          setWebFallback(shortlink.web.fallback);
        } else {
          console.error('Error fetching shortlink:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching shortlink:', error);
      }
    };

    fetchShortlink();
  }, [match.params.slug]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const shortlinkData = {
      ios: { fallback: iosFallback },
      android: { fallback: androidFallback },
      web: { fallback: webFallback },
    };

    try {
      const response = await fetch(`/api/shortlinks/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shortlinkData),
      });

      if (response.ok) {
        console.log('Shortlink updated successfully');
      } else {
        console.error('Error updating shortlink:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating shortlink:', error);
    }
  };

  return (
    <div>
      <h1>Update Shortlink</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Slug:
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            readOnly
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateShortlink;

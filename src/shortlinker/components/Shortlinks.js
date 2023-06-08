// src/components/Shortlinks.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Shortlinks() {
  const [shortlinks, setShortlinks] = useState([]);

  useEffect(() => {
    fetchShortlinks();
  }, []);

  const fetchShortlinks = async () => {
    try {
      const response = await axios.get('/api/shortlinks');
      setShortlinks(response.data);
    } catch (error) {
      console.error('Error fetching shortlinks:', error);
    }
  };

  return (
    <div>
      <h1>Shortlinks</h1>
      {shortlinks.map((shortlink) => (
        <div key={shortlink.id}>
          <p>Slug: {shortlink.slug}</p>
          <p>iOS Fallback: {shortlink.ios?.fallback}</p>
          <p>Android Fallback: {shortlink.android?.fallback}</p>
          <p>Web Fallback: {shortlink.web?.fallback}</p>
          <a href={`/update/${shortlink.id}`}>Edit</a>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Shortlinks;
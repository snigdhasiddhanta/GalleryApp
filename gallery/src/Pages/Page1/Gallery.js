import React, { useState } from 'react';
import axios from 'axios';
import './Page1.css';

export const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleSearch = async () => {
    try {   
      const apiKey = '096e234801d0fe006629bf8c5c42fa1d';
      const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${searchTerm}&format=json&nojsoncallback=1`;

      const response = await axios.get(apiUrl);

      if (response.data && response.data.photos && response.data.photos.photo) {
        setPhotos(response.data.photos.photo);
      }
    } catch (error) {
    }
  };

  return (
    <div className='gallery-container'>
      <div className='search-container'>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search Images'
          className='search'
        />
        <button className='search-btn' onClick={handleSearch}>Search</button>
      </div>
      <div className='gallery'>
        {photos.map((photo) => (
          <div key={photo.id} className='col'>
            <img
              src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`}
              alt={photo.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

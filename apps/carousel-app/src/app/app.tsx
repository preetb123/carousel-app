import React, { useEffect, useState } from 'react';
import { ImageInfo } from '@carousel-app/api-interfaces';
import { ImageCarousel } from '@carousel-app/carousel/ui';
import { useFetch } from '@carousel-app/carousel/hooks-util';
import './app.css';

export const App = () => {
  const { result, error } = useFetch<ImageInfo[]>('/api/images');
  if (!result) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching images. Please retry again</div>;
  }
  if (result.length === 0) {
    return <div>No images available</div>;
  }
  return (
    <div className="app">
      <h1 style={{ position: 'absolute', top: 24 }}>
        Welcome to Carousel App!
      </h1>
      <ImageCarousel items={result} />
    </div>
  );
};

export default App;

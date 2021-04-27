import React from 'react';
import './carousel-item.css';
/* eslint-disable-next-line */
export interface CarouselItemProps {
  title?: string;
  imageUrl?: string;
  shouldHighlight?: boolean;
  size?: number;
}

export const CarouselItem = React.memo(
  ({ title, imageUrl, shouldHighlight, size }: CarouselItemProps) => {
    size = size * (shouldHighlight ? 1.4 : 1);
    if (!title && !imageUrl) {
      return <div style={{ height: size, width: size }}></div>;
    }

    const styles = shouldHighlight
      ? {
          boxShadow: shouldHighlight ? '10px 10px 10px #888888' : null,
          margin: 24,
          zIndex: 10,
        }
      : { margin: 8 };

    return (
      <div className={shouldHighlight ? 'block highlight' : 'block'}>
        <img
          style={styles}
          src={imageUrl}
          alt={title}
          width={size}
          height={size}
        />
        <p style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.title === nextProps.title &&
      prevProps.imageUrl === nextProps.imageUrl &&
      prevProps.shouldHighlight === nextProps.shouldHighlight
    );
  }
);

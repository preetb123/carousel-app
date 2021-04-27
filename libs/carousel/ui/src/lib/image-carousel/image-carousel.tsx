import React from 'react';
import { CarouselItem } from '../carousel-item/carousel-item';
import './image-carousel.css';

/* eslint-disable-next-line */

type BlocksNum = 3 | 4;

export interface ImageCarouselProps {
  items: CarouselItemData[];
  blocks?: BlocksNum;
}

interface CarouselItemData {
  title: string;
  images: string[];
}

enum ActionType {
  NEXT = 'next',
  PREVIOUS = 'previous',
}

type Action = {
  type: ActionType;
};

const actionNext = {
  type: ActionType.NEXT,
};

const actionPrevious = {
  type: ActionType.PREVIOUS,
};

function carouselReducer(state: number[], action: Action) {
  switch (action.type) {
    case ActionType.NEXT:
      return state.map((position) => position + 1);
    case ActionType.PREVIOUS:
      return state.map((position) => position - 1);
  }
}

const getInitialState = (blocks: number): number[] => {
  const state: number[] = [];
  for (let i = -1; i < blocks - 1; i++) {
    state.push(i);
  }
  return state;
};

export const ImageCarousel = ({ items, blocks = 4 }: ImageCarouselProps) => {
  const initialState = React.useMemo(() => getInitialState(blocks), [blocks]);
  const isThreeBlocks = React.useMemo(() => blocks === 3, [blocks]);

  const [state, dispatch] = React.useReducer(carouselReducer, initialState);

  const getBlockData = (position: number) => {
    let title = '';
    let imageUrl = '';
    if (isThreeBlocks && position === -1) {
      return { title, imageUrl };
    }
    position = position + (isThreeBlocks ? 0 : 1);
    title = items[position].title;
    const images = items[position].images;
    const randomIndex = Math.floor(Math.random() * images.length);
    imageUrl = items[position].images[randomIndex];
    return { title, imageUrl };
  };

  const onNextClick = () => {
    dispatch(actionNext);
  };

  const onPreviousClick = () => {
    dispatch(actionPrevious);
  };

  if (items.length === 0) return null;
  console.log(state, ' images: ', items.length);
  return (
    <div className="container">
      <div className="imageBlocks">
        {state.map((position, index) => {
          const { title, imageUrl } = getBlockData(position);
          const shouldHighlight = isThreeBlocks && index === 1;
          const size = window.innerWidth / (isThreeBlocks ? 4 : 4.5);
          return (
            <CarouselItem
              shouldHighlight={shouldHighlight}
              key={`${title}${index}`}
              title={title}
              imageUrl={imageUrl}
              size={size}
            />
          );
        })}
      </div>
      <div>
        <button
          className="button"
          disabled={state[0] < 0}
          onClick={onPreviousClick}
        >
          Previous
        </button>
        <button
          className="button"
          disabled={
            state[state.length - 1] === items.length - (isThreeBlocks ? 1 : 2)
          }
          onClick={onNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;

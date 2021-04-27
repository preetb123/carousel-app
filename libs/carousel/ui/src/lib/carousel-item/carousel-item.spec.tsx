import { render } from '@testing-library/react';

import { CarouselItem } from './carousel-item';

describe('CarouselItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CarouselItem />);
    expect(baseElement).toBeTruthy();
  });
});

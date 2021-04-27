import { render } from '@testing-library/react';

import { ImageCarousel } from './image-carousel';

describe('ImageCarousel', () => {
  it('should render successfully', () => {
    const element = render(<ImageCarousel items={[]} blocks={3} />);
    expect(element).toBeTruthy();
  });
});

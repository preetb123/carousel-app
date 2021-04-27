import { render } from '@testing-library/react';

import CarouselHooksUtil from './carousel-hooks-util';

describe('CarouselHooksUtil', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CarouselHooksUtil />);
    expect(baseElement).toBeTruthy();
  });
});

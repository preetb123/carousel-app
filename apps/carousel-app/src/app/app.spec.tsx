import {
  cleanup,
  getByText,
  render,
  waitFor,
  screen,
  waitForElementToBeRemoved,
  fireEvent,
} from '@testing-library/react';
import React from 'react';
import App from './app';

import { makeServer } from '@carousel-app/carousel/test-utils';

describe('App', () => {
  let server;

  beforeEach(() => {
    server = makeServer('test');
  });

  afterEach(() => {
    server.shutdown();
    cleanup();
  });

  it('should render successfully with welcome message', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    await waitFor(() => screen.getByText('Welcome to Carousel App!'));
  });

  it('button previous is disabled initially & next enabled', async () => {
    const { queryByText } = render(<App />);
    await waitForElementToBeRemoved(() => queryByText('Loading...'));
    const previousButton = queryByText('Previous');
    expect(previousButton.closest('button').disabled).toBeTruthy();
    const nextButton = queryByText('Next');
    expect(nextButton.closest('button').disabled).toBeFalsy();
  });

  it('clicking next 2 times disables the next button', async () => {
    const { queryByText } = render(<App />);
    await waitFor(() => screen.getByText('Welcome to Carousel App!'));
    const nextButton = queryByText('Next');
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(nextButton.closest('button').disabled).toBeTruthy();
  });

  it('clicking next and previous once has previous disabled', async () => {
    const { queryByText } = render(<App />);
    await waitFor(() => screen.getByText('Welcome to Carousel App!'));
    const nextButton = queryByText('Next');
    fireEvent.click(nextButton);
    const previousButton = queryByText('Previous');
    fireEvent.click(previousButton);
    expect(previousButton.closest('button').disabled).toBeTruthy();
  });
});

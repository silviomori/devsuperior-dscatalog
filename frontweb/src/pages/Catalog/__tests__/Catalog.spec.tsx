import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import history from 'util/history';
import Catalog from '..';

test('should render Catalog with products', async () => {
  render(
    <Router history={history}>
      <Catalog />
    </Router>
  );

  expect(screen.getByText('Product catalog')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText('Smart TV')).toBeInTheDocument();
  });
  
});

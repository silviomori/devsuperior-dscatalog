import { render, screen } from '@testing-library/react';
import ProductPrice from '..';

test('should render ProductPrice', () => {
  const price = 2199;
  render(<ProductPrice price={price} />);
  expect(screen.getByText('$')).toBeInTheDocument();
  expect(screen.getByText('2,199.00')).toBeInTheDocument();
});

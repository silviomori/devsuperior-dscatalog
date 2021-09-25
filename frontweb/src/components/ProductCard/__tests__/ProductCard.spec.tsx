import { render, screen } from '@testing-library/react';
import { Product } from 'types/product';
import ProductCard from '..';

test('should render ProductCard', () => {
  const product = {
    name: 'New Product 01',
    price: 1.97,
    imgUrl: 'http://productimage.test.png',
  } as Product;
  render(<ProductCard product={product} />);
  expect(screen.getByText(product.name)).toBeInTheDocument();
  expect(screen.getByAltText(product.name)).toBeInTheDocument();
  expect(screen.getByText('$')).toBeInTheDocument();
  expect(screen.getByText('1.97')).toBeInTheDocument();
});

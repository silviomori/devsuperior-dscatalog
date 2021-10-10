import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, useParams } from 'react-router-dom';
import selectEvent from 'react-select-event';
import { ToastContainer } from 'react-toastify';
import history from 'util/history';
import ProductCrudForm from '../ProductCrudForm';
import { server } from './fixtures';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Product Crud Form creation tests', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ productId: 'create' });
  });
  test('should show toast and redirect when product created', async () => {
    render(
      <Router history={history}>
        <ToastContainer />
        <ProductCrudForm />
      </Router>
    );

    const nameInput = screen.getByTestId('name');
    const priceInput = screen.getByTestId('price');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');
    const categoriesInput = screen.getByLabelText('Categories');
    const submitButton = screen.getByRole('button', { name: /save/i });

    await selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores']);
    userEvent.type(nameInput, 'Desktop computer');
    userEvent.type(priceInput, '1059.79');
    userEvent.type(
      imgUrlInput,
      'https://www.clipartmax.com/png/full/177-1776045_product-image-box-icon-png.png'
    );
    userEvent.type(
      descriptionInput,
      'Affordable desktop computer for programmers.'
    );

    userEvent.click(submitButton);

    await waitFor(() => {
      const toastElement = screen.getByText('Product created.');
      expect(toastElement).toBeInTheDocument();
      expect(history.location.pathname).toEqual('/admin/products');
    });
  });
});

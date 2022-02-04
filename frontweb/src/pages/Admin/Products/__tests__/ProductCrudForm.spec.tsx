import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, useParams } from 'react-router-dom';
import selectEvent from 'react-select-event';
import { ToastContainer } from 'react-toastify';
import { formatPrice } from 'util/formatters';
import history from 'util/history';
import ProductCrudForm from '../ProductCrudForm';
import { productResponse, server } from './fixtures';

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

  test('should show 5 validation messages when just clicking submit', async () => {
    render(
      <Router history={history}>
        <ProductCrudForm />
      </Router>
    );

    const submitButton = screen.getByRole('button', { name: /save/i });

    userEvent.click(submitButton);

    await waitFor(() => {
      const messages = screen.getAllByText('Required field');
      expect(messages).toHaveLength(5);
    });
  });

  test('should clear validation messages when filling out the form correctly', async () => {
    render(
      <Router history={history}>
        <ProductCrudForm />
      </Router>
    );

    const submitButton = screen.getByRole('button', { name: /save/i });

    userEvent.click(submitButton);

    await waitFor(() => {
      const messages = screen.getAllByText('Required field');
      expect(messages).toHaveLength(5);
    });

    const nameInput = screen.getByTestId('name');
    const priceInput = screen.getByTestId('price');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');
    const categoriesInput = screen.getByLabelText('Categories');

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

    await waitFor(() => {
      const messages = screen.queryAllByText('Required field');
      expect(messages).toHaveLength(0);
    });
  });
});

describe('Product Crud Form updating tests', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ productId: '2' });
  });

  test('should show toast and redirect when product updated', async () => {
    render(
      <Router history={history}>
        <ToastContainer />
        <ProductCrudForm />
      </Router>
    );

    await waitFor(() => {
      const nameInput = screen.getByTestId('name');
      const priceInput = screen.getByTestId('price');
      const imgUrlInput = screen.getByTestId('imgUrl');
      const descriptionInput = screen.getByTestId('description');
      const formElement = screen.getByTestId('form');

      expect(nameInput).toHaveValue(productResponse.name);
      expect(priceInput).toHaveValue(String(productResponse.price));
      expect(imgUrlInput).toHaveValue(productResponse.imgUrl);
      expect(descriptionInput).toHaveValue(productResponse.description);
      const categoryIds = productResponse.categories.map(cat =>String(cat.id));
      expect(formElement).toHaveFormValues({ categories: categoryIds });
    });
    const submitButton = screen.getByRole('button', { name: /save/i });

    userEvent.click(submitButton);

    await waitFor(() => {
      const toastElement = screen.getByText('Product created.');
      expect(toastElement).toBeInTheDocument();
      expect(history.location.pathname).toEqual('/admin/products');
    });
  });
});

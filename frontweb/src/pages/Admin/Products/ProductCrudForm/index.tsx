import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Product } from 'types/product';
import { requestBackend } from 'util/requests';
import './styles.css';

const ProductCrudForm = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const onSubmit = (product: Product) => {
    product = {
      ...product,
      imgUrl:
        'https://www.clipartmax.com/png/full/177-1776045_product-image-box-icon-png.png',
      categories: [{ id: 1, name: '' }],
    };
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/products',
      data: product,
      withCredentials: true,
    };
    requestBackend(config)
      .then((response) => {
        history.push('/admin/products');
      })
      .catch((error) => console.log('error: ', error));
  };

  const handleCancel = () => {
    history.push('/admin/products');
  };

  return (
    <div className="base-card product-crud-form-container">
      <h1>Product details</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <div className="product-crud-form-input">
              <input
                {...register('name', {
                  required: 'Required field',
                })}
                type="text"
                className={`form-control base-input ${
                  errors.name ? 'is-invalid' : ''
                }`}
                placeholder="Product name"
                name="name"
              />
              <div className="invalid-feedback d-block">
                {errors.name?.message}
              </div>
            </div>
            <div className="product-crud-form-input">
              <input
                type="text"
                placeholder="Category"
                className="form-control base-input"
              ></input>
            </div>
            <div className="product-crud-form-input">
              <input
                {...register('price', {
                  required: 'Required field',
                })}
                type="text"
                className={`form-control base-input ${
                  errors.price ? 'is-invalid' : ''
                }`}
                placeholder="Price"
                name="price"
              />
              <div className="invalid-feedback d-block">
                {errors.price?.message}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div>
                  <button className="btn btn-secondary text-white product-crud-form-upload-button">
                    upload image
                  </button>
                  <p className="product-crud-form-image-restrictions text-primary">
                    Images must be in JPG or PNG format and must not exceed{' '}
                    <b>5 mb</b>.
                  </p>
                </div>
              </div>
              <div className="col-sm-6 product-crud-form-image-preview">
                Image preview
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <textarea
              {...register('description', {
                required: 'Required field',
              })}
              className={`form-control base-input ${
                errors.description ? 'is-invalid' : ''
              }`}
              placeholder="Description"
              name="description"
            />
            <div className="invalid-feedback d-block">
              {errors.description?.message}
            </div>
          </div>
          <div className="row product-crud-form-action-container">
            <button
              className="btn btn-outline-danger product-crud-form-action-button col-5 col-md-4"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className="btn btn-primary product-crud-form-action-button col-5 col-md-4">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductCrudForm;

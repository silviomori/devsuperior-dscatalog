import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Product } from 'types/product';
import { requestBackend } from 'util/requests';
import { Category } from 'types/category';
import Select from 'react-select';
import './styles.css';

type UrlParams = {
  productId: string;
};

const ProductCrudForm = () => {
  const history = useHistory();

  const { productId } = useParams<UrlParams>();
  const isEditing = productId !== 'create';

  const [selectCategories, setSelectCategories] = useState<Category[]>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Product>();

  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/products/${productId}` })
        .then((response) => {
          const product = response.data as Product;
          setValue('name', product.name);
          setValue('categories', product.categories);
          setValue('price', product.price);
          setValue('imgUrl', product.imgUrl);
          setValue('description', product.description);
        })
        .catch((error) => console.log('error: ', error));
    }
  }, [productId, isEditing, setValue]);

  useEffect(() => {
    requestBackend({ url: '/categories' }).then((response) =>
      setSelectCategories(response.data.content)
    );
  }, []);

  const onSubmit = (product: Product) => {
    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/products/${productId}` : '/products',
      data: product,
      withCredentials: true,
    };
    requestBackend(config)
      .then((response) => {
        history.push('/admin/products');
      })
      .catch((error) => console.log('error: ', error));
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
            <div className="product-crud-form-input product-crud-form-input-select">
              <Controller
                name="categories"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    className={`form-control ${
                      errors.categories ? 'is-invalid' : ''
                    }`}
                    classNamePrefix="product-crud-select"
                    options={selectCategories}
                    isMulti
                    getOptionLabel={(category: Category) => category.name}
                    getOptionValue={(category: Category) => String(category.id)}
                  />
                )}
              />
              {errors.categories && (
                <div className="invalid-feedback d-block">Required field</div>
              )}
            </div>
            <div className="product-crud-form-input">
              <Controller
                name="price"
                rules={{ required: 'Required field' }}
                control={control}
                render={({ field }) => (
                  <CurrencyInput
                    placeholder="Price"
                    className={`form-control base-input ${
                      errors.price ? 'is-invalid' : ''
                    }`}
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                )}
              />
              <div className="invalid-feedback d-block">
                {errors.price?.message}
              </div>
            </div>
            {/*<div className="row">
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
            </div>*/}
            <div className="product-crud-form-input">
              {/* https://www.clipartmax.com/png/full/177-1776045_product-image-box-icon-png.png */}
              <input
                {...register('imgUrl', {
                  required: 'Required field',
                  pattern: {
                    value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                    message: 'Invalid URL',
                  },
                })}
                type="text"
                className={`form-control base-input ${
                  errors.imgUrl ? 'is-invalid' : ''
                }`}
                placeholder="Product image URL"
                name="imgUrl"
              />
              <div className="invalid-feedback d-block">
                {errors.imgUrl?.message}
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

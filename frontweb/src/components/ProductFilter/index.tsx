import './styles.css';
import { ReactComponent as SearchIconSvg } from 'assets/images/search-icon.svg';
import { Category } from 'types/category';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { requestBackend } from 'util/requests';

type ProductFilterData = {
  name: string;
  category: Category;
};

const ProductFilter = () => {
  const [selectCategories, setSelectCategories] = useState<Category[]>();
  const {
    register,
    handleSubmit,
    control,
  } = useForm<ProductFilterData>();

  const onSubmit = (formData: ProductFilterData) => {
    console.log(formData);
  };

  useEffect(() => {
    requestBackend({ url: '/categories' }).then((response) =>
      setSelectCategories(response.data.content)
    );
  }, []);

  return (
    <div className="base-card product-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="product-filter-form">
        <div className="product-filter-name-container">
          <input
            {...register('name')}
            type="text"
            className="form-control"
            placeholder="Product name"
            name="name"
          />
          <button className="btn">
            <SearchIconSvg />
          </button>
        </div>
        <div className="product-filter-select-container">
          <div className="product-filter-category-container">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="form-control"
                  classNamePrefix="product-filter-select"
                  options={selectCategories}
                  isClearable
                  getOptionLabel={(category: Category) => category.name}
                  getOptionValue={(category: Category) => String(category.id)}
                />
              )}
            />{' '}
          </div>
          <button className="btn btn-outline-secondary">Clear</button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;

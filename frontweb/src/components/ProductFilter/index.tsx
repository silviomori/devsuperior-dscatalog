import './styles.css';
import { ReactComponent as SearchIconSvg } from 'assets/images/search-icon.svg';

const ProductFilter = () => {
  return (
    <div className="base-card product-filter-container">
      <form action="" className="product-filter-form">
        <div className="product-filter-name-container">
          <input
            type="text"
            placeholder="Product name"
            className="form-control"
          />

          <SearchIconSvg />
        </div>
        <div className="product-filter-select-container">
          <div className="product-filter-category-container">
            <select
              name=""
              id=""
              placeholder="Category"
              className="form-control"
            >
              <option value="0"></option>
              <option value="1">Books</option>
            </select>
          </div>
          <button className="btn btn-outline-secondary">Clear</button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;

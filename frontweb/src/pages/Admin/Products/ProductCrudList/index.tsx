import { Link } from 'react-router-dom';
import ProductCrudCard from '../ProductCrudCard';
import './styles.css';

const ProductCrudList = () => {
  return (
    <>
      <div className="product-crud-header-container">
        <Link to="/admin/products/create">
          <button className="btn btn-primary text-white btn-product-crud-add">
            New Product
          </button>
        </Link>
        <div className="base-card product-crud-filter-container">
          Search bar
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-md-12">
          <ProductCrudCard />
        </div>
        <div className="col-sm-6 col-md-12">
          <ProductCrudCard />
        </div>
        <div className="col-sm-6 col-md-12">
          <ProductCrudCard />
        </div>
        <div className="col-sm-6 col-md-12">
          <ProductCrudCard />
        </div>
        <div className="col-sm-6 col-md-12">
          <ProductCrudCard />
        </div>
        <div className="col-sm-6 col-md-12">
          <ProductCrudCard />
        </div>
      </div>
    </>
  );
};

export default ProductCrudList;

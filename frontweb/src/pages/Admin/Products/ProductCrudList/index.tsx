import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import ProductCrudCard from '../ProductCrudCard';
import './styles.css';

const ProductCrudList = () => {
  const [page, setPage] = useState<SpringPage<Product>>();
  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: 0,
        size: 12,
      },
    };
    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, []);

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
        {page &&
          page.content.map((product) => (
            <div className="col-sm-6 col-md-12" key={product.id}>
              <ProductCrudCard product={product} />
            </div>
          ))}
      </div>
    </>
  );
};

export default ProductCrudList;

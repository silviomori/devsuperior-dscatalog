import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import ProductCrudCard from '../ProductCrudCard';
import './styles.css';

type SubcomponentState = {
  activePage: number;
};

const ProductCrudList = () => {
  const [page, setPage] = useState<SpringPage<Product>>();
  const [subcomponentState, setSubcomponentState] = useState<SubcomponentState>(
    {
      activePage: 0,
    }
  );

  const getProducts = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: subcomponentState.activePage,
        size: 6,
      },
    };
    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [subcomponentState]);

  useEffect(getProducts, [getProducts]);

  const handlePageChange = (pageNumber: number) => {
    setSubcomponentState({ activePage: pageNumber });
  };

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
              <ProductCrudCard product={product} onDelete={getProducts} />
            </div>
          ))}
      </div>
      <Pagination
        pageCount={page ? page.totalPages : 0}
        range={3}
        onChange={handlePageChange}
      />
    </>
  );
};

export default ProductCrudList;

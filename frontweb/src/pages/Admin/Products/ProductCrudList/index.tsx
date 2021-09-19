import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import ProductFilter, { ProductFilterData } from 'components/ProductFilter';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import ProductCrudCard from '../ProductCrudCard';
import './styles.css';

type SubcomponentState = {
  activePage: number;
  filterData: ProductFilterData;
};

const ProductCrudList = () => {
  const [page, setPage] = useState<SpringPage<Product>>();
  const [subcomponentState, setSubcomponentState] = useState<SubcomponentState>(
    {
      activePage: 0,
      filterData: { name: '', category: null },
    }
  );

  const getProducts = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: subcomponentState.activePage,
        size: 6,
        name: subcomponentState.filterData.name,
        categoryId: subcomponentState.filterData.category?.id,
      },
    };
    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [subcomponentState]);

  useEffect(getProducts, [getProducts]);

  const handlePageChange = (pageNumber: number) => {
    setSubcomponentState({
      activePage: pageNumber,
      filterData: subcomponentState.filterData,
    });
  };

  const handleFilterSubmit = (data: ProductFilterData) => {
    setSubcomponentState({ activePage: 0, filterData: data });
  };

  return (
    <>
      <div className="product-crud-header-container">
        <Link to="/admin/products/create">
          <button className="btn btn-primary text-white btn-product-crud-add">
            New Product
          </button>
        </Link>
        <ProductFilter onFilterSubmit={handleFilterSubmit} />
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
        forcePage={page?.number}
      />
    </>
  );
};

export default ProductCrudList;

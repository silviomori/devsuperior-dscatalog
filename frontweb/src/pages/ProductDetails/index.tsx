import './styles.css';
import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import { Product } from 'types/product';
import ProductPrice from 'components/ProductPrice';
import { Link } from 'react-router-dom';

const product: Product = {
  id: 1,
  name: 'The Lord of the Rings',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  price: 90.5,
  imgUrl:
    'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg',
  date: '2020-07-13T20:50:07.123450Z',
  categories: [
    {
      id: 2,
      name: 'Eletrônicos',
    },
  ],
};

const ProductDetails = () => {
  return (
    <div className="product-details-container">
      <div className="base-card product-details-card">
        <Link to="/products">
          <div className="goback-container">
            <ArrowIcon />
            <h1>Back</h1>
          </div>
        </Link>
        <div className="row">
          <div className="col-xl-6">
            <div className="product-details-img-container">
              <img src={product.imgUrl} alt={product.name} />
            </div>
            <div className="product-details-name-price-container">
              <h1>{product.name}</h1>
              <ProductPrice price={product.price} />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="product-details-description-container">
              <h1>Product description</h1>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

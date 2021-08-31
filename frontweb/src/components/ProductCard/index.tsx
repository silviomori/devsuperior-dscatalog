import './styles.css';
import ProductPng from 'assets/images/product.png';
import ProductPrice from 'components/ProductPrice';

const ProductCard = () => {
  return (
    <div className="base-card product-card">
      <div className="card-top-container">
        <img src={ProductPng} alt="Product Name" />
      </div>
      <div className="card-bottom-container">
        <h6>Desktop Computer - Intel Core i7</h6>
        <ProductPrice />
      </div>
    </div>
  );
};

export default ProductCard;

import './styles.css';
import ProductPng from 'assets/images/product.png';
import ProductPrice from 'components/ProductPrice';
import CategoryBadge from '../CategoryBadge';

const ProductCrudCard = () => {
  return (
    <div className="base-card product-crud-card-container">
      <div className="product-crud-card-image-container">
        <img src={ProductPng}></img>
      </div>
      <div className="product-crud-card-details-container">
        <h6>Desktop Computer - Intel Core i7</h6>
        <ProductPrice price={2779.0} />
        <div className="product-crud-card-categories-container">
          <CategoryBadge name="Cat 1" />
          <CategoryBadge name="Cat 2" />
        </div>
      </div>
    </div>
  );
};

export default ProductCrudCard;

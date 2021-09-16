import './styles.css';
import ProductPrice from 'components/ProductPrice';
import CategoryBadge from '../CategoryBadge';
import { Product } from 'types/product';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
};

const ProductCrudCard = ({ product }: Props) => {
  return (
    <div className="base-card product-crud-card-container">
      <div className="product-crud-card-image-container">
        <img className="img-fluid" src={product.imgUrl} alt={product.name}></img>
      </div>
      <div className="product-crud-card-details-container">
        <h6>{product.name}</h6>
        <ProductPrice price={product.price} />
        <div className="product-crud-card-categories-container">
          {product.categories &&
            product.categories.map((cat) => (
              <CategoryBadge name={cat.name} key={cat.id} />
            ))}
        </div>
      </div>
      <div className="product-crud-card-buttons-container">
        <button className="btn btn-outline-danger product-crud-card-button">
          Delete
        </button>
        <Link to={`/admin/products/${product.id}`}>
          <button className="btn btn-outline-secondary product-crud-card-button">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCrudCard;

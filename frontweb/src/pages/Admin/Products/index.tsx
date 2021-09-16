import { Route, Switch } from 'react-router';
import Form from './ProductCrudForm';
import List from './ProductCrudList';
import './styles.css';

const Products = () => {
  return (
    <div className="product-crud-container">
      <Switch>
        <Route path="/admin/products" exact>
          <List />
        </Route>
        <Route path="/admin/products/:productId">
          <Form />
        </Route>
      </Switch>
    </div>
  );
};

export default Products;

import { Route, Switch } from 'react-router';
import Form from './ProductCrudForm';
import List from './ProductCrudList';
import './styles.css';

const Products = () => {
  return (
    <Switch>
      <Route path="/admin/products" exact>
        <List />
      </Route>
      <Route path="/admin/products/:productId">
        <Form />
      </Route>
    </Switch>
  );
};

export default Products;

import './styles.css';
import { ReactComponent as AuthImage } from 'assets/images/auth-image.svg';
import { Route, Switch } from 'react-router-dom';

const Auth = () => {
  return (
    <div className="auth-container">
      <div className="auth-banner-container">
        <h1>Promote your products on DS Catalog</h1>
        <p>Be part of our promotional catalog and increase your sales</p>
        <AuthImage />
      </div>
      <div className="base-card auth-form-container">
        <Switch>
          <Route path="/admin/auth/login">
            <h1>Card Login</h1>
          </Route>
          <Route path="/admin/auth/signup">
            <h1>Card Sign Up</h1>
          </Route>
          <Route path="/admin/auth/recover">
            <h1>Card Recover</h1>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Auth;

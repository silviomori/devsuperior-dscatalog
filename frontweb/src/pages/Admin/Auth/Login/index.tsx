import './styles.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';
import { AuthContext } from 'AuthContext';
import { useContext } from 'react';
import { requestBackendLogin } from 'util/requests';
import { saveAuthData } from 'util/storage';
import { getTokenData } from 'util/auth';

type CredentialsDTO = {
  username: string;
  password: string;
};

type LocationState = {
  from: string;
};

const Login = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const { from } = location.state || { from: { pathname: '/admin' } };
  const { setAuthContextData } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm<CredentialsDTO>();
  const onSubmit = (credentialsDTO: CredentialsDTO) => {
    requestBackendLogin(credentialsDTO)
      .then((response) => {
        saveAuthData(response.data);
        setAuthContextData({ authenticated: true, tokenData: getTokenData() });
        history.replace(from);
      })
      .catch((error) => console.log('error: ', error));
  };

  return (
    <div className="base-card login-card">
      <h1>Sign-In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register('username', {
              required: 'Required field',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            type="text"
            className={`form-control base-input ${errors.username ? 'is-invalid' : ''}`}
            placeholder="Email"
            name="username"
          />
          <div className="invalid-feedback d-block">
            {errors.username?.message}
          </div>
        </div>
        <div className="mb-2">
          <input
            {...register('password', { required: 'Required field' })}
            type="password"
            className={`form-control base-input ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Password"
            name="password"
          />
          <div className="invalid-feedback d-block">
            {errors.password?.message}
          </div>
        </div>
        <Link to="/admin/auth/recover" className="login-link-recover">
          Esqueci a senha
        </Link>
        <div className="login-submit">
          <ButtonIcon text="Sign-in" />
        </div>
        <div className="signup-container">
          <span className="not-registered">New to DS Catalog?</span>
          <Link to="/admin/auth/register" className="login-link-register">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

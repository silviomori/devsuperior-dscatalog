import './styles.css';
import { Link } from 'react-router-dom';
import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';
import { requestBackendLogin, saveAuthData } from 'util/requests';

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
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
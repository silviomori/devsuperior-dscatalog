import { ReactComponent as MainImage } from 'assets/images/main-image.svg';

import './styles.css';
import ButtonIcon from 'components/ButtonIcon';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-card base-card">
        <div className="home-content-container">
          <div>
            <h1>Meet the best product catalog</h1>
            <p>We help you find the best products available on the market.</p>
          </div>
          <div>
            <Link to="/products">
              <ButtonIcon />
            </Link>
          </div>
        </div>
        <div className="home-image-container">
          <MainImage />
        </div>
      </div>
    </div>
  );
};

export default Home;

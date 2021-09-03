import './styles.css';

const Navbar = () => {
  return (
    <nav className="admin-nav-container">
      <ul>
        <li>
          <a href="link" className="admin-nav-item active">
            Products
          </a>
        </li>
        <li>
          <a href="link" className="admin-nav-item">
            Categories
          </a>
        </li>
        <li>
          <a href="link" className="admin-nav-item">
            Users
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

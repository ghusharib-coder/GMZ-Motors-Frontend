import React, { useContext, useState } from 'react';
import { AuthContext } from '../App';
import { Link } from 'react-router-dom';

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false); // control collapse

  function handleLogout() {
    // Remove user and close menu
    setUser(null);
    setIsOpen(false);
  }

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={closeNavbar}>GMZ Motors</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeNavbar}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pricing" onClick={closeNavbar}>Pricing</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services" onClick={closeNavbar}>Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/faq" onClick={closeNavbar}>FAQ</Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile" onClick={closeNavbar}>Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/booking" onClick={closeNavbar}>Booking</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/complaint" onClick={closeNavbar}>Complaint</Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    style={{ color: 'white' }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={closeNavbar}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup" onClick={closeNavbar}>Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
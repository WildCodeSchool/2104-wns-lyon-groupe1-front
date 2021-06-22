import { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import burgerMenu from '../assets/burgermenu.svg';
import './Header.scss';
import UserContext from '../utils/UserContext';

export default function Header() {
  const user = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!user.id) history.push('/me-connecter');
  }, [location.pathname]);

  if (!user.id) return <div className="header-offline" />;

  return (
    <div className="Header">
      <img src={logo} alt="logo Study Notes" />
      <h1>
        <span>Study</span>Notes
      </h1>
      <div className="button-burger-menu">
        <button type="button">
          <img src={burgerMenu} alt="burgermenu" />
        </button>
      </div>
    </div>
  );
}

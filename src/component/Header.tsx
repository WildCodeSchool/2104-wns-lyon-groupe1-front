import logo from '../assets/logo.svg';
import burgerMenu from '../assets/burgermenu.svg';
import './Header.scss';

export default function Header() {
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

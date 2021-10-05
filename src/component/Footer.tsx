import { Link } from 'react-router-dom';
import './Footer.scss';
import logo from '../assets/logo.svg';

export default function Footer() {
  return (
    <div className="Footer">
      <img src={logo} alt="logo Notes" />
      <ul>
        <li>
          <Link to="/nous-contacter" data-testid="contact">
            Nous Contacter
          </Link>
        </li>
        <li>
          <Link to="/notre-équipe" data-testid="team">
            Notre équipe
          </Link>
        </li>
        <li>
          <Link to="/mentions-legales" data-testid="mention">
            Mentions légales
          </Link>
        </li>
      </ul>
    </div>
  );
}

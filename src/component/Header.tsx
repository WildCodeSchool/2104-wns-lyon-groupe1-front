import {
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import burgerMenu from '../assets/burgermenu.svg';
import cross from '../assets/cross.svg';
import './Header.scss';
import UserContext from '../utils/UserContext';

type PropsMenu = {
  teacher: boolean | undefined;
  menuOpen: Dispatch<SetStateAction<boolean>>;
};

type TLocation = {
  pathname: string;
  state: { hide: boolean };
};

const Menu = ({ teacher, menuOpen }: PropsMenu) => {
  return (
    <div className="menu dislay-block">
      <div>
        <button onClick={() => menuOpen(false)} type="button">
          <img alt="quitter" src={cross} />
        </button>
      </div>
      <h2>
        <Link to={{ pathname: '/', state: { hide: true } }}>Accueil</Link>
      </h2>
      <div className="menu-section yellow-border-color">
        <h2>{teacher ? 'Mes fiches de révision' : 'Mes matières'}</h2>
        {!teacher && (
          <Link to={{ pathname: '/mes-matières', state: { hide: true } }}>
            Liste des matières
          </Link>
        )}
        <Link
          to={{ pathname: '/mes-fiches-de-revisions', state: { hide: true } }}
        >
          Liste des fiches de révisions
        </Link>
        {teacher && (
          <Link to={{ pathname: '/ajouter-une-fiche', state: { hide: true } }}>
            Ajouter des fiches
          </Link>
        )}
      </div>
      <div className="menu-section blue-border-color">
        <h2> Forums</h2>
        <Link to={{ pathname: '/forum', state: { hide: true } }}>
          Rechercher un topic
        </Link>
      </div>
      <div className="menu-section green-border-color">
        <h2>Mon espace</h2>
        <Link to={{ pathname: '/mon-espace', state: { hide: true } }}>
          Mes informations
        </Link>
        {teacher && (
          <Link to={{ pathname: '/mes-promotions', state: { hide: true } }}>
            Mes promotions
          </Link>
        )}
      </div>
      <h2>
        <Link to={{ pathname: '/rechercher', state: { hide: true } }}>
          Rechercher
        </Link>
      </h2>
      <h2>
        <Link to={{ pathname: '/me-deconnecter', state: { hide: true } }}>
          Me déconnecter
        </Link>
      </h2>
    </div>
  );
};

export default function Header() {
  const user = useContext(UserContext);
  const history = useHistory();
  const { pathname, state }: TLocation = useLocation();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user.id) history.push('/me-connecter');
    if (state?.hide) {
      setOpen(false);
    }
  }, [pathname, state]);

  if (!user.id) return <div className="header-offline" />;

  return (
    <>
      <div className="Header">
        <img src={logo} alt="logo Study Notes" />
        <h1>
          <span>Study</span>Notes
        </h1>
        <div className="button-burger-menu">
          <button onClick={() => setOpen(true)} type="button">
            <img src={burgerMenu} alt="burgermenu" />
          </button>
        </div>
      </div>
      {open && <Menu teacher={user?.isTeacher} menuOpen={setOpen} />}
    </>
  );
}

const Menu = ({ teacher, menuOpen }: PropsMenu) => {
  return (
    <div className="menu dislay-block">
      <div>
        <button onClick={() => menuOpen(false)} type="button">
          <img alt="quitter" src={cross} />
        </button>
      </div>
      <h2>
        <Link to={{ pathname: '/', state: { hide: true } }}>Accueil</Link>
      </h2>
      <div className="menu-section yellow-border-color">
        <h2>{teacher ? 'Mes fiches de révision' : 'Mes matières'}</h2>
        {!teacher && (
          <Link to={{ pathname: '/mes-matières', state: { hide: true } }}>
            Liste des matières
          </Link>
        )}
        <Link
          to={{ pathname: '/mes-fiches-de-revisions', state: { hide: true } }}
        >
          Liste des fiches de révisions
        </Link>
        {teacher && (
          <Link to={{ pathname: '/ajouter-une-fiche', state: { hide: true } }}>
            Ajouter des fiches
          </Link>
        )}
      </div>
      <div className="menu-section blue-border-color">
        <h2> Forums</h2>
        <Link to={{ pathname: '/forum', state: { hide: true } }}>
          Rechercher un topic
        </Link>
      </div>
      <div className="menu-section green-border-color">
        <h2>Mon espace</h2>
        <Link to={{ pathname: '/mon-espace', state: { hide: true } }}>
          Mes informations
        </Link>
        {teacher && (
          <Link to={{ pathname: '/mes-promotions', state: { hide: true } }}>
            Mes promotions
          </Link>
        )}
      </div>
      <h2>
        <Link to={{ pathname: '/rechercher', state: { hide: true } }}>
          Rechercher
        </Link>
      </h2>
      <h2>
        <Link to={{ pathname: '/me-deconnecter', state: { hide: true } }}>
          Me déconnecter
        </Link>
      </h2>
    </div>
  );
};

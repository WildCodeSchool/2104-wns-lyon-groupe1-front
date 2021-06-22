import { Dispatch, useState, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';
import { IUser } from '../utils/interface';
import logo from '../assets/logo.svg';

type ConnectProps = {
  setUser: Dispatch<SetStateAction<IUser>>;
};

export default function Connect({ setUser }: ConnectProps) {
  const [formInput, setFormInput] = useState({ email: '', password: '' });
  const [error, setError] = useState(false);
  const history = useHistory();

  const handleForm = (e: any) => {
    e.preventDefault();
    if (!formInput.email.length || !formInput.password.length) {
      setError(true);
    } else {
      setUser({
        id: '1',
        firstname: 'John',
        lastname: 'Doe',
        isTeacher: false,
        email: 'nicolas.legrand@aze.com',
        classroom: {
          name: 'Wild Code School',
        },
      });
      history.push('/');
    }
  };

  return (
    <div className="connection-block">
      <img src={logo} alt="logo" />
      <form onSubmit={handleForm}>
        {error && <p>Un des champs n’est pas valide.</p>}
        <input
          required
          type="email"
          placeholder="Email"
          name="email"
          value={formInput.email}
          onChange={(e) =>
            setFormInput({ ...formInput, [e.target.name]: e.target.value })
          }
        />
        <input
          required
          type="text"
          placeholder="Mot de passe"
          name="password"
          value={formInput.password}
          onChange={(e) =>
            setFormInput({ ...formInput, [e.target.name]: e.target.value })
          }
        />
        <button type="submit">Se Connecter</button>
      </form>
    </div>
  );
}

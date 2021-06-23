import { Dispatch, useState, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';
import { IUser, IClassroom } from '../utils/interface';
import logo from '../assets/logo.svg';
import './Connect.scss';

type ConnectProps = {
  setUser: Dispatch<SetStateAction<IUser>>;
};

export default function Connect({ setUser }: ConnectProps) {
  const [formInput, setFormInput] = useState({ email: '', password: '' });
  const [error, setError] = useState(false);
  const [addClassroom, setAddClassroom] = useState(false);
  const [classrooms, setClassrooms] = useState<Array<IClassroom>>([]);
  const [data, setData] = useState<IUser>({});
  const history = useHistory();

  const handleForm = (e: any) => {
    e.preventDefault();
    if (!formInput.email.length || !formInput.password.length) {
      setError(true);
    } else {
      setData({
        id: '1',
        firstname: 'John',
        lastname: 'Doe',
        isTeacher: false,
        email: 'nicolas.legrand@aze.com',
      });
      setClassrooms([
        {
          name: 'Wild Code School',
          year: '2021/2022',
          id: '1',
        },
        {
          name: 'Oclock',
          year: '2021/2022',
          id: '2',
        },
      ]);
    }
  };

  const handleChoice = (e: any, classroom: IClassroom) => {
    e.preventDefault();
    setUser({
      ...data,
      classroom,
    });
    history.push('/');
  };

  if (addClassroom) {
    return <h2>Ajout promotion</h2>;
  }

  if (classrooms.length) {
    return (
      <>
        <h2 className="title greetings">Mes promotions</h2>
        <div className="list-classrooms">
          {classrooms.map((c) => (
            <button
              onClick={(e) => handleChoice(e, c)}
              key={`${c.name}${c.id}`}
              type="button"
              className="buttons"
            >
              {c.name} {c.year}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setAddClassroom(true)}
            className="buttons"
          >
            Ajouter une promotion
          </button>
        </div>
      </>
    );
  }

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

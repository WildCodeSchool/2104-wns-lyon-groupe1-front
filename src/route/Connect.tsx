import { Dispatch, useState, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/graphqlRequest';
import { IUser, IClassroom } from '../utils/interface';
import logo from '../assets/logo.svg';
import './Connect.scss';

type ConnectProps = {
  setUser: Dispatch<SetStateAction<IUser>>;
};

export default function Connect({ setUser }: ConnectProps) {
  const [formInput, setFormInput] = useState({ email: '', password: '' });
  const [error, setError] = useState(false);
  const [classrooms, setClassrooms] = useState<Array<IClassroom>>([]);
  const [user, setUserConnect] = useState<IUser>({});
  const [connect] = useMutation(LOGIN, {
    onCompleted: (value) => {
      setClassrooms(value.user.classroom);
      setUserConnect({ ...value.user, classroom: {} });
    },
    onError: () => {
      setError(true);
    },
  });
  const [addClassroom, setAddClassroom] = useState(false);
  const history = useHistory();

  const handleForm = (e: any) => {
    e.preventDefault();
    if (!formInput.email.length || !formInput.password.length) {
      setError(true);
    } else {
      connect({
        variables: { mail: formInput.email, password: formInput.password },
      });
      // setUserConnect({
      //   id: '1',
      //   firstname: 'John',
      //   lastname: 'Doe',
      //   isTeacher: false,
      //   email: 'nicolas.legrand@aze.com',
      // });
      // setClassrooms([
      //   {
      //     name: 'Développement web Lyon',
      //     year: '2021/2022',
      //     id: '1',
      //   },
      //   {
      //     name: 'Développement web Marseille',
      //     year: '2021/2022',
      //     id: '2',
      //   },
      // ]);
    }
  };

  const handleChoice = (e: any, classroom: IClassroom) => {
    e.preventDefault();
    setUser({
      ...user,
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
        <div className="greetings">Wild Code School</div>
        <div className="list-classrooms">
          {classrooms.map((c) => (
            <button
              onClick={(e) => handleChoice(e, c)}
              key={`${c.name}${c.classroomId}`}
              type="button"
              className="buttons"
              data-testid={`btn-promo-${c.classroomId}`}
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
        {error && (
          <p data-testid="info-form">Les identifiants ne sont pas reconnus.</p>
        )}
        <input
          required
          type="email"
          placeholder="Email"
          name="email"
          value={formInput.email}
          data-testid="input-mail"
          onChange={(e) =>
            setFormInput({ ...formInput, [e.target.name]: e.target.value })
          }
        />
        <input
          required
          type="text"
          placeholder="Mot de passe"
          name="password"
          data-testid="input-password"
          value={formInput.password}
          onChange={(e) =>
            setFormInput({ ...formInput, [e.target.name]: e.target.value })
          }
        />
        <button type="submit" data-testid="btn-connect">
          Se Connecter
        </button>
      </form>
    </div>
  );
}

import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/graphqlRequest';
import { IUser, IClassroom } from '../utils/interface';
import AddPromotion from './addPromotion';
import logo from '../assets/logo.svg';
import './Connect.scss';

type ConnectProps = {
  setUser: (user: IUser) => void;
};

export default function Connect({ setUser }: ConnectProps) {
  const [formInput, setFormInput] = useState({ mail: '', password: '' });
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
    if (!formInput.mail.length || !formInput.password.length) {
      setError(true);
    } else {
      connect({
        variables: { mail: formInput.mail, password: formInput.password },
      });
    }
  };

  const handleChoice = (classroom: IClassroom) => {
    setUser({
      ...user,
      classroom,
    });
    history.push('/');
  };

  if (addClassroom) {
    return <AddPromotion handleClassroom={handleChoice} />;
  }

  if (classrooms.length) {
    return (
      <>
        <h2 className="title greetings">Mes promotions</h2>
        <div className="greetings">Wild Code School</div>
        <div className="list-classrooms">
          {classrooms.map((c) => (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleChoice(c);
              }}
              key={`${c.name}${c.classroomId}`}
              type="button"
              className="buttons buttons-promotion"
              data-testid={`btn-promo-${c.classroomId}`}
            >
              <span>
                {c.name} {c.year}
              </span>
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
          name="mail"
          value={formInput.mail}
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

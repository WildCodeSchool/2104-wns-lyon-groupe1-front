import { useContext, useState } from 'react';
import UserContext from '../utils/UserContext';
import './AddStudent.scss';

export default function AddStudent() {
  const user = useContext(UserContext);
  const [error, setError] = useState(false);
  const [mail, setMail] = useState('');

  const handleSumbit = (e: any) => {
    e.preventDefault();
    setError(false);

    if (
      !mail.length ||
      !mail.match(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g,
      )
    ) {
      setError(true);
      return;
    }

    setMail('');
  };

  return (
    <div className="add-student">
      <h2 className="title greetings">Ajouter un élève</h2>
      <div className="greetings">Wild Code School</div>
      <div className="greetings">
        {user.classroom?.name} {user.classroom?.year}
      </div>
      <form onSubmit={handleSumbit}>
        <input
          className={error ? 'error' : ''}
          name="mail"
          placeholder="Email académique"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <button type="submit" className="buttons">
          Ajouter
        </button>
      </form>
    </div>
  );
}

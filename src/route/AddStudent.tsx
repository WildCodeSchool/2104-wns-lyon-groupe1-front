import { useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorModal from '../component/ErrorModal';
import { ADD_STUDENT_TO_CLASSROOM } from '../utils/graphqlRequest';
import { UserContext } from '../utils/UserContext';
import './AddStudent.scss';

export default function AddStudent() {
  const { user } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [mail, setMail] = useState('');
  const [isVisibleErrorModal, setIsVisibleErrorModal] = useState(false);
  const history = useHistory();
  const [addStudentToClassroom] = useMutation(ADD_STUDENT_TO_CLASSROOM, {
    variables: {
      classroomId: user.classroom?.classroomId || '',
      studentMail: mail,
    },
    onCompleted: () => {
      history.push('/ma-promotion');
    },
    onError: () => {
      setIsVisibleErrorModal(true);
    },
  });

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
    addStudentToClassroom();
  };

  return (
    <div className="add-student">
      <ErrorModal
        buttonText="Ok"
        isVisible={isVisibleErrorModal}
        onConfirmCallback={() => setIsVisibleErrorModal(false)}
        text="Impossible d'ajouter un élève, ressayer plus tard"
      />
      <h2 className="title greetings">Ajouter un élève</h2>
      <div className="greetings">
        {user.classroom?.name} {user.classroom?.year}
      </div>
      <form onSubmit={handleSumbit}>
        <label htmlFor="mail">
          {error && "Veuillez vérifier l'adresse mail"}
          <input
            className={error ? 'error' : ''}
            name="mail"
            id="mail"
            placeholder="Email académique"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </label>
        <button type="submit" className="buttons">
          Ajouter
        </button>
      </form>
    </div>
  );
}

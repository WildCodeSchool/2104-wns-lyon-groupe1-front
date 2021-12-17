import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { UserContext } from '../utils/UserContext';
import OverLay from '../component/OverLay';
import { IClassroom } from '../utils/interface';
import './MyClassroom.scss';
import pencil from '../assets/pencil.svg';
import { GET_CLASSROOM_STUDENTS } from '../utils/graphqlRequest';
import ErrorModal from '../component/ErrorModal';

export default function MyClassroom() {
  const { user } = useContext(UserContext);
  const [modal, openModal] = useState(false);
  const [isVisibleErrorModal, setIsVisibleErrorModal] =
    useState<boolean>(false);
  const history = useHistory();
  const { loading, data } = useQuery<
    { getClassroom: IClassroom },
    { classroomId: string }
  >(GET_CLASSROOM_STUDENTS, {
    variables: {
      classroomId: user.classroom?.classroomId || '',
    },
    onError: () => {
      setIsVisibleErrorModal(true);
    },
  });

  if (loading || !data) return <p>Loading...</p>;
  const classroom = data.getClassroom;

  return (
    <div className="classroom-student">
      <ErrorModal
        buttonText="ok"
        isVisible={isVisibleErrorModal}
        text="Une erreur s'est produite, ressayer plus tard"
        onConfirmCallback={() => setIsVisibleErrorModal(false)}
      />
      <OverLay getIsOpen={openModal} isOpen={modal}>
        <h2 className="title greetings">Paramètres</h2>
        <button type="button" className="buttons">
          Réinitialiser le mot de passe
        </button>
      </OverLay>

      <h2 className="title greetings">
        {user.classroom?.name} {user.classroom?.year}
      </h2>
      <button
        onClick={() => history.push('/ajouter-un-élève')}
        className="buttons"
        type="button"
      >
        Ajouter un élève
      </button>
      {classroom.student.map((student, index: number) => (
        <div key={index} className="student-block">
          <span>
            {!student.firstname && !student.lastname
              ? student.mail
              : `${student.firstname || ''} ${student.lastname || ''}`}
          </span>
          <button onClick={() => openModal(!modal)} type="button">
            <img src={pencil} alt="modifier mot de passe" />
          </button>
        </div>
      ))}
    </div>
  );
}

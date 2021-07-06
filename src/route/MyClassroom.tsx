import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../utils/UserContext';
import OverLay from '../component/OverLay';
import { IClassroomStudent } from '../utils/interface';
import './MyClassroom.scss';
import pencil from '../assets/pencil.svg';

export default function MyClassroom() {
  const { user } = useContext(UserContext);
  const [modal, openModal] = useState(false);
  const history = useHistory();
  const [classroom, setClassroom] = useState<IClassroomStudent>({
    classroomId: '1',
    name: 'Oclck',
    year: '2021/2022',
    student: [
      {
        firstname: 'John',
        lastname: 'Francois',
        mail: 'irf@fi',
        userId: '5',
      },
      {
        firstname: 'fezfezfezfzefzf',
        lastname: 'Francois',
        mail: 'irf@fi',
        userId: '5',
      },
      {
        firstname: 'John',
        lastname: 'Francois',
        mail: 'irf@fi',
        userId: '5',
      },
      {
        firstname: 'John',
        lastname: 'Francdzezefzefezefois',
        mail: 'irf@fi',
        userId: '5',
      },
      {
        mail: 'irf@fi',
        userId: '5',
      },
      {
        firstname: 'John',
        lastname: 'Francois',
        mail: 'irf@fi',
        userId: '5',
      },
      {
        firstname: 'John',
        lastname: 'Francois',
        mail: 'irf@fi',
        userId: '5',
      },
      {
        firstname: 'John',
        lastname: 'Francois',
        mail: 'irf@fi',
        userId: '5',
      },
      {
        firstname: 'John',
        lastname: 'Francois',
        mail: 'irf@fi',
        userId: '5',
      },
      {
        firstname: 'John',
        lastname: 'Francois',
        mail: 'irf@fi',
        userId: '5',
      },
    ],
  });

  return (
    <div className="classroom-student">
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
      {classroom?.student.map((student) => (
        <div className="student-block">
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

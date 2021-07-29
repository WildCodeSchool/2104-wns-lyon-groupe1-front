import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IClassroomSubject } from '../utils/interface';
import './Study.scss';

export default function Study() {
  const history = useHistory();
  const [classroom, setClassroom] = useState<IClassroomSubject>({
    classroomId: '1',
    name: 'Développement Web Lyon',
    year: '2021/2022',
    subject: [
      {
        id: '1',
        imageUrl: '/images/Node.js_logo.svg',
        name: 'NodeJS',
      },
      {
        id: '2',
        imageUrl: '/images/logo-react-blue-1.svg',
        name: 'React',
      },
      {
        id: '3',
        imageUrl: '/images/GraphQL_Logo.svg',
        name: 'GraphQL',
      },
      {
        id: '4',
        imageUrl: '/images/javascript-logo.svg',
        name: 'Javascript',
      },
      {
        id: '5',
        imageUrl: '/images/Angular_full_color_logo.svg',
        name: 'Angular',
      },
      {
        id: '6',
        imageUrl: '/images/PHP-logo.svg',
        name: 'PHP',
      },
      {
        id: '7',
        imageUrl: '/images/HTML5_logo_and_wordmark.svg',
        name: 'HTML 5',
      },
    ],
  });

  return (
    <>
      <h1>Mes matières</h1>
      <div className="subject-list">
        {classroom?.subject.map((element) => (
          <div className="subject-element" key={element.id}>
            <img src={element.imageUrl} alt={element.name} />
            <button type="button" className="buttons subject-buttons">
              {element.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

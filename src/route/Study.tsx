import './Study.scss';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  useParams,
  BrowserRouter,
} from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { ALL_SUBJECTS } from '../utils/graphqlRequest';
import Flashcards from './FlashCards';

export default function Study() {
  // const { loading, error, data } = useQuery(ALL_SUBJECTS);
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error! {error.message}</div>;
  const mockData = {
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
        name: 'HTML5',
      },
    ],
  };

  return (
    <>
      <h1>Mes matières</h1>
      <div className="subject-list">
        {mockData?.subject.map((element: any) => (
          <div
            data-testid={element.id}
            className="subject-element"
            key={element.id}
          >
            <img src={element.imageUrl} alt={element.name} />
            <Link to={`${element.name}`} className="link-button">
              <button type="button" className="buttons subject-buttons">
                {element.name}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

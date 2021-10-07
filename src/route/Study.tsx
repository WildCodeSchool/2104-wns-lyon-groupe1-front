import './Study.scss';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import slugify from 'react-slugify';
import { ALL_SUBJECTS_BY_CLASSROOM } from '../utils/graphqlRequest';
import Flashcards from './FlashCards';
import { UserContext } from '../utils/UserContext';

export default function Study() {
  const { user } = useContext(UserContext);
  const { loading, error, data } = useQuery(ALL_SUBJECTS_BY_CLASSROOM, {
    variables: {
      classroomId: user.classroom?.classroomId,
    },
  });
  if (loading) return <div>On recherche les matières de votre promo...</div>;
  if (error)
    return <div>Oups! Une erreur s&apos;est produite {error.message}</div>;

  /* const mockData = {
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
  */

  return (
    <>
      <h1>Mes matières</h1>
      <div className="subject-list">
        {data?.subject.map((element: any) => (
          <div
            data-testid={element.id}
            className="subject-element"
            key={element.id}
          >
            <img src={element.imageUrl} alt={element.name} />
            <Link to={slugify(`${element.name}`)} className="link-button">
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

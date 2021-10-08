import './Study.scss';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import slugify from 'react-slugify';
import { ALL_SUBJECTS_BY_CLASSROOM } from '../utils/graphqlRequest';
import { UserContext } from '../utils/UserContext';

export default function Study() {
  const { user } = useContext(UserContext);

  // const { loading, error, data } = useQuery(ALL_SUBJECTS_BY_CLASSROOM, {
  //   variables: {
  //     classroomId: user.classroom?.classroomId,
  //   },
  // });
  // if (loading) return <div>On recherche les matières de votre promo...</div>;
  // if (error)
  //   return <div>Oups! Une erreur s&apos;est produite {error.message}</div>;

  // POur les tests provisoires
  const mockData = {
    classroomId: '1',
    name: 'Développement Web Lyon',
    year: '2021/2022',
    subject: [
      {
        subjectId: '1',
        imageUrl: '/images/Node.js_logo.svg',
        name: 'NodeJS',
      },
      {
        subjectId: '2',
        imageUrl: '/images/logo-react-blue-1.svg',
        name: 'React',
      },
      {
        subjectId: '3',
        imageUrl: '/images/GraphQL_Logo.svg',
        name: 'GraphQL',
      },
      {
        subjectId: '4',
        imageUrl: '/images/javascript-logo.svg',
        name: 'Javascript',
      },
      {
        subjectId: '5',
        imageUrl: '/images/Angular_full_color_logo.svg',
        name: 'Angular',
      },
      {
        subjectId: '6',
        imageUrl: '/images/PHP-logo.svg',
        name: 'PHP',
      },
      {
        subjectId: '7',
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
            data-testid={element.subjectId}
            className="subject-element"
            key={element.subjectId}
          >
            <img src={element.imageUrl} alt={element.name} />
            <Link
              to={{
                pathname: slugify(`${element.name}`),
                state: { subjectId: element.subjectId },
              }}
              className="link-button"
            >
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

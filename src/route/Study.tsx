import './Study.scss';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import slugify from 'react-slugify';
import { ALL_SUBJECTS_BY_CLASSROOM } from '../utils/graphqlRequest';
import { UserContext } from '../utils/UserContext';

export default function Study() {
  const { user } = useContext(UserContext);

  const { data, loading } = useQuery(ALL_SUBJECTS_BY_CLASSROOM, {
    variables: {
      classroomId: user.classroom?.classroomId,
    },
    skip: user.classroom?.classroomId === undefined,
  });

  if (loading || !data?.getAllSubjectsByClassroom)
    return <h1>Chargement des matières</h1>;

  return (
    <>
      <h1>Mes matières</h1>
      <div className="subject-list" data-testid="subject-loop">
        {data.getAllSubjectsByClassroom.map((element: any) => (
          <div
            data-testid={element.id}
            className="subject-element"
            key={element.id}
          >
            <img
              src={`${process.env.REACT_APP_API_URL}${element.imageUrl}`}
              alt={element.name}
            />
            <Link
              to={{
                // pathname: slugify(`${element.name}`),
                pathname: `/mes-matières/${slugify(`${element.name}`)}`,
                state: { subjectId: element.id },
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

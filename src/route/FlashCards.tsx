import './FlashCards.scss';
import { useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ALL_FLASHCARDS_BY_SUBJECTS } from '../utils/graphqlRequest';
import { UserContext } from '../utils/UserContext';

export default function FlashCards() {
  const { user } = useContext(UserContext);
  const { matiere }: { matiere: string } = useParams();
  const { state }: { state: { subjectId: string } } = useLocation();

  const { loading, error, data } = useQuery(ALL_FLASHCARDS_BY_SUBJECTS, {
    variables: {
      classroomId: user.classroom?.classroomId,
      subjectId: state?.subjectId,
    },
  });
  if (loading) return <div>On recherche les fiches {matiere}...</div>;
  if (error)
    return <div>Oups! Une erreur s&apos;est produite {error.message}</div>;

  /* const flashCardsBySubjectData = {
    classroomId: '1',
    name: 'Développement Web Lyon',
    year: '2021/2022',
    subject: [
      {
        subjectId: '1',
        imageUrl: '/images/Node.js_logo.svg',
        name: 'NodeJS',

        flashcard: [
          {
            id: '1',
            title: "Découverte d'express",
          },
          {
            id: '2',
            title: 'Lecture depuis la base de données',
          },
          {
            id: '3',
            title: 'GET en détail',
          },
          {
            id: '4',
            title: 'Méthode DELETE et suppression de données',
          },
        ],
      },
    ],
  }; */

  return (
    <>
      <h1>{matiere}</h1>
      <div className="flashcard-list">
        {data?.subject.map((element: any) => (
          <div
            data-testid={element.subjectId}
            className="flashcard-element"
            key={element.subjectId}
          >
            {element.flashcard.map((flashcard: any) => (
              <button
                key={flashcard.id}
                type="button"
                className="buttons flashcard-buttons"
              >
                {flashcard.title}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

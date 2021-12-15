import './FlashCards.scss';
import slugify from 'react-slugify';
import { useContext } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ALL_FLASHCARDS_BY_SUBJECTS } from '../utils/graphqlRequest';
import { UserContext } from '../utils/UserContext';

export default function FlashCards() {
  const { user } = useContext(UserContext);
  const { matiere }: { matiere: string } = useParams();
  const history = useHistory();
  const { state }: { state: { subjectId: string } } = useLocation();
  const { loading, error, data } = useQuery<
    {
      getAllFlashcardsBySubject: {
        id: string;
        flashcard: Array<{ id: string; title: string }>;
      };
    },
    { classroomId: string; subjectId: string }
  >(ALL_FLASHCARDS_BY_SUBJECTS, {
    variables: {
      classroomId: user.classroom?.classroomId || '',
      subjectId: state.subjectId,
    },
    skip:
      user.classroom?.classroomId === undefined ||
      state.subjectId === undefined,
  });
  if (loading) return <div>On recherche les fiches {matiere}...</div>;
  if (error || !data)
    return <div>Oups! Une erreur s&apos;est produite {error?.message}</div>;

  return (
    <>
      <h1>{matiere}</h1>
      <div className="flashcard-list">
        <div
          data-testid={data.getAllFlashcardsBySubject.id}
          className="flashcard-element"
          key={data.getAllFlashcardsBySubject.id}
        >
          {data.getAllFlashcardsBySubject.flashcard.map((flashcard: any) => (
            <button
              key={flashcard.id}
              type="button"
              className="buttons flashcard-buttons"
              onClick={() => {
                history.push({
                  pathname: `/mes-matières/${matiere}/${slugify(
                    flashcard.title,
                  )}`,
                  state: {
                    flashcardId: flashcard.id,
                    subjectId: data.getAllFlashcardsBySubject.id,
                  },
                });
              }}
            >
              {flashcard.title}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

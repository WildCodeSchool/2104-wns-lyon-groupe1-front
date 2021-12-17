import './FlashCards.scss';
import slugify from 'react-slugify';
import { useContext } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ALL_FLASHCARDS_BY_SUBJECTS } from '../utils/graphqlRequest';
import { UserContext } from '../utils/UserContext';
import pencil from '../assets/pencil.svg';

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
        {(() => {
          if (user.isTeacher) {
            return (
              <Link to="/ajouter-une-fiche">
                <button type="button" className="button flashcard-creation-btn">
                  Créer une fiche
                </button>
              </Link>
            );
          }
          return '';
        })()}
        {flashCardsBySubjectData?.subject.map((element: any) => (
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
                onClick={() => {
                  history.push({
                    pathname: `/mes-matières/matiere/${slugify(
                      flashcard.title,
                    )}}`,
                    state: { flashcardId: flashcard.id },
                  });
                }}
              >
                {flashcard.title}
                <div
                  aria-hidden="true"
                  onClick={() => {
                    history.push({
                      pathname: `/modifier-une-fiche`,
                      state: { flashcardId: flashcard.id },
                    });
                  }}
                >
                  <div className="modifyButton">
                    <img src={pencil} alt="modifier mot de passe" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

import { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Switch from 'react-switch';
import {
  GET_FLASHCARD_BY_ID,
  UPDATE_FLASHCARD_STUDENT,
} from '../utils/graphqlRequest';
import Block from '../component/Block';
import bubbleMessage from '../assets/bubblemessage.svg';
import './Flashcard.scss';
import { IFlashcard } from '../utils/interface';
import { UserContext } from '../utils/UserContext';

export default function Flashcard() {
  // const { state } = useLocation();
  // console.log(state);
  const history = useHistory();
  const [writingMode, setWritingMode] = useState(false);
  const { user } = useContext(UserContext);

  const { loading, data } = useQuery<
    { getFlashcard: IFlashcard },
    { flashcardId: string; classroomId: string | undefined }
  >(GET_FLASHCARD_BY_ID, {
    variables: {
      flashcardId: '613afe5a2e3b7348540024f0',
      classroomId: user.classroom?.classroomId,
    },
    onError: () => {
      // voir comment on gere les erreurs ?
      history.goBack();
    },
    skip: user.classroom?.classroomId === undefined,
  });
  // Subject Id a recupérer dans le state du routeur
  const [flashcardMutation] = useMutation<{
    updateFlashcardParagraph: IFlashcard;
  }>(UPDATE_FLASHCARD_STUDENT, {
    variables: {
      classroomId: user.classroom?.classroomId || '',
      flashcardId: data?.getFlashcard?.id || '',
      subjectId: '613afd9b58d5994584d87b45',
      subtitleId: '',
      paragraph: null,
      ressource: null,
    },
  });

  const handleChangeVisibility = (subtitleId: string, paragraphId: string) => {
    flashcardMutation({
      variables: {
        subtitleId,
        paragraph: {
          paragraphId,
          isPublic: true,
        },
      },
    });
  };

  const handleEditParagraph = (
    subtitleId: string,
    paragraphId: string | null,
    isPublic: boolean,
    text: string,
  ) => {
    flashcardMutation({
      variables: {
        subtitleId,
        paragraph: {
          paragraphId,
          isPublic,
          text,
        },
      },
    });
  };

  const handleEditRessource = (name: string, url: string) => {
    flashcardMutation({ variables: { ressource: { name, url } } });
  };

  const handleValidation = (subtitleId: string, paragraphId: string) => {
    flashcardMutation({
      variables: {
        subtitleId,
        paragraph: {
          paragraphId,
          isValidate: true,
        },
      },
    });
  };

  if (loading || !data) return <p>Loading...</p>;
  const flashcard = data.getFlashcard;
  return (
    <div className="flashcard">
      <div className="flashcard-header">
        <p className="flashcard-tags">
          {flashcard.tag?.map((tag) => (
            <Link to={`/forum?tag=${tag}`} key={tag}>
              <span>{`#${tag}`}</span>
            </Link>
          ))}
        </p>
        <h2>{flashcard.title}</h2>
        <div className="flashcard-header-action">
          {!user.isTeacher && (
            <>
              <Switch
                onColor="#FCC300"
                offColor="#000000"
                uncheckedIcon={false}
                checkedIcon={false}
                onChange={() => setWritingMode((prev) => !prev)}
                checked={writingMode}
                width={32}
                height={20}
              />
              <span>{writingMode ? 'Ecriture' : 'Lecture'}</span>
            </>
          )}
          <button
            className="btn"
            type="button"
            onClick={() => history.push('/forums')}
          >
            <img src={bubbleMessage} alt="Accéder au forum" />
          </button>
        </div>
      </div>

      {/* sur les subtitles, ressources 
        title
        contenu
        showLock
      */}
      {flashcard.subtitle?.map((subtitle) => (
        <Block
          edit={writingMode}
          title={subtitle.title}
          paragraph={subtitle.paragraph}
          key={subtitle.title}
          position={subtitle.position}
          actionVisibility={handleChangeVisibility}
          actionValidation={handleValidation}
          subtitleId={subtitle.id}
          handleEdit={handleEditParagraph}
        />
      ))}
      <Block
        title="Ressources"
        ressource={flashcard.ressource}
        edit={writingMode}
        handleEditRessource={handleEditRessource}
      />
    </div>
  );
}

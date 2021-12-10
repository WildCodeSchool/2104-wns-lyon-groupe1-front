import { useState, useContext } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
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

<<<<<<< HEAD
=======
const flashcard: IFlashcard = {
  id: '51541',
  title: 'Introduction à GraphQL',
  tag: ['react', 'js', 'mutation'],
  ressource: [
    { name: 'ressource1', url: 'urlres1' },
    { name: 'ressource2', url: 'urlres2' },
  ],
  question: [],
  subtitle: [
    {
      title: 'Définition',
      position: 0,
      paragraph: [
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in pellentesque dui. Nullam molestie, nisl quis accumsan porttitor, mauris ante malesuada arcu, nec euismod magna dui sit amet arcu. Integer pulvinar neque sed orci ornare, in interdum metus tristique. Phasellus nisl eros, feugiat et dui non, consequat semper ligula. Mauris vulputate nunc sed maximus auctor. Aliquam porttitor diam a tempus tincidunt. Aenean vel sapien nec massa bibendum congue non eu risus. Duis placerat eleifend tempus. Donec libero ligula, vehicula a pharetra a, cursus sed nisi. Ut id dictum ante. Etiam ultricies arcu sit amet urna auctor consectetur. Proin placerat erat at porta laoreet. Aliquam eget odio id ante volutpat feugiat. Duis rutrum sem eu commodo efficitur. Nam rutrum volutpat consequat. Proin pellentesque faucibus mauris, id accumsan ex aliquam nec.',
          isValidate: true,
          isPublic: true,
          author: 'Jonathan',
          date: '1970-01-19T21:07:33.352Z',
        },
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in pellentesque dui. Nullam molestie, nisl quis accumsan porttitor, mauris ante malesuada arcu, nec euismod magna dui sit amet arcu. Integer pulvinar neque sed orci ornare, in interdum metus tristique. Phasellus nisl eros, feugiat et dui non, consequat semper ligula. Mauris vulputate nunc sed maximus auctor. Aliquam porttitor diam a tempus tincidunt. Aenean vel sapien nec massa bibendum congue non eu risus. Duis placerat eleifend tempus. Donec libero ligula, vehicula a pharetra a, cursus sed nisi. Ut id dictum ante. Etiam ultricies arcu sit amet urna auctor consectetur. Proin placerat erat at porta laoreet. Aliquam eget odio id ante volutpat feugiat. Duis rutrum sem eu commodo efficitur. Nam rutrum volutpat consequat. Proin pellentesque faucibus mauris, id accumsan ex aliquam nec.',
          isValidate: true,
          isPublic: false,
          author: 'Jonathan',
          date: '1970-05-19T21:07:33.352Z',
        },
      ],
    },
    {
      title: 'Developpement',
      position: 1,
      paragraph: [
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in pellentesque dui. Nullam molestie, nisl quis accumsan porttitor, mauris ante malesuada arcu, nec euismod magna dui sit amet arcu. Integer pulvinar neque sed orci ornare, in interdum metus tristique. Phasellus nisl eros, feugiat et dui non, consequat semper ligula. Mauris vulputate nunc sed maximus auctor. Aliquam porttitor diam a tempus tincidunt. Aenean vel sapien nec massa bibendum congue non eu risus. Duis placerat eleifend tempus. Donec libero ligula, vehicula a pharetra a, cursus sed nisi. Ut id dictum ante. Etiam ultricies arcu sit amet urna auctor consectetur. Proin placerat erat at porta laoreet. Aliquam eget odio id ante volutpat feugiat. Duis rutrum sem eu commodo efficitur. Nam rutrum volutpat consequat. Proin pellentesque faucibus mauris, id accumsan ex aliquam nec.',
          isValidate: true,
          isPublic: true,
          author: 'Jonathan',
          date: '1970-01-19T21:07:33.352Z',
        },
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in pellentesque dui. Nullam molestie, nisl quis accumsan porttitor, mauris ante malesuada arcu, nec euismod magna dui sit amet arcu. Integer pulvinar neque sed orci ornare, in interdum metus tristique. Phasellus nisl eros, feugiat et dui non, consequat semper ligula. Mauris vulputate nunc sed maximus auctor. Aliquam porttitor diam a tempus tincidunt. Aenean vel sapien nec massa bibendum congue non eu risus. Duis placerat eleifend tempus. Donec libero ligula, vehicula a pharetra a, cursus sed nisi. Ut id dictum ante. Etiam ultricies arcu sit amet urna auctor consectetur. Proin placerat erat at porta laoreet. Aliquam eget odio id ante volutpat feugiat. Duis rutrum sem eu commodo efficitur. Nam rutrum volutpat consequat. Proin pellentesque faucibus mauris, id accumsan ex aliquam nec.',
          isValidate: true,
          isPublic: true,
          author: 'Jonathan',
          date: '1970-05-19T21:07:33.352Z',
        },
      ],
    },
  ],
};

>>>>>>> e7f429f (+ forum)
export default function Flashcard() {
  const { state } = useLocation<{ flashcardId: string; subjectId: string }>();

  const history = useHistory();
  const [writingMode, setWritingMode] = useState(false);
  const { user } = useContext(UserContext);

  const { loading, data } = useQuery<
    { getFlashcard: IFlashcard },
    { flashcardId: string; classroomId: string }
  >(GET_FLASHCARD_BY_ID, {
    variables: {
      flashcardId: state.flashcardId || '',
      classroomId: user.classroom?.classroomId || '',
    },
    onError: () => {
      // voir comment on gere les erreurs ?
      history.goBack();
    },
    skip:
      user.classroom?.classroomId === undefined ||
      state.flashcardId === undefined,
  });

  const [flashcardMutation] = useMutation<{
    updateFlashcardParagraph: IFlashcard;
  }>(UPDATE_FLASHCARD_STUDENT, {
    variables: {
      classroomId: user.classroom?.classroomId || '',
      flashcardId: data?.getFlashcard?.id || '',
      subjectId: state.subjectId || '',
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

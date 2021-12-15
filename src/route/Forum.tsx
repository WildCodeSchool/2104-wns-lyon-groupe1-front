<<<<<<< HEAD
<<<<<<< HEAD
/* eslint-disable react/no-unescaped-entities */
import { useState, useRef, FormEvent, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import PageTitleSmall from '../component/PageTitleSmall';
import './forum.scss';
import { IFlashcard, IQuestion } from '../utils/interface';
import QuestionBlock from '../component/QuestionBlock';
import ForumEditorBlock from '../component/ForumEditorBlock';
import {
  GET_FLASHCARD_FORUM,
  UPDATE_FLASHCARD_STUDENT,
} from '../utils/graphqlRequest';
import { UserContext } from '../utils/UserContext';

export default function FlashcardForum() {
  const [editorInputText, setEditorInputText] = useState<string>('');
  const { state } = useLocation<{ flashcardId: string; subjectId: string }>();
  const questionEditorRef = useRef<HTMLDivElement>(null);
  const { user } = useContext(UserContext);
  // =============================================================

  const { loading, data } = useQuery<
    { getFlashcard: IFlashcard },
    { flashcardId: string; classroomId: string }
  >(GET_FLASHCARD_FORUM, {
    variables: {
      classroomId: user.classroom?.classroomId || '',
      flashcardId: state.flashcardId || '',
    },
    onError: () => {
      window.alert('Error loading flashcard forum');
    },
  });

  console.log(data);

  const [flashcardMutation] = useMutation<{ updateForum: IFlashcard }>(
    UPDATE_FLASHCARD_STUDENT,
    {
      variables: {
        classroomId: user.classroom?.classroomId || '',
        flashcardId: state.flashcardId || '',
        subjectId: state.subjectId || '',
        answer: null,
        question: null,
      },
    },
  );

  const handlePostQuestion = (text: string) => {
    flashcardMutation({
      variables: {
        question: { text },
      },
    });
  };

  const handlePostAnswer = (questionId: string, text: string) => {
    flashcardMutation({
      variables: {
        answer: {
          questionId,
          text,
        },
      },
    });
  };

  // =============================================================
  const takeMeToQuestionEditor = () => {
    const node = questionEditorRef.current;
    node?.scrollIntoView();
  };

  const submitQuestion = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    window.alert(editorInputText);
  };
  // ============================================
  return (
    <div className="forumPageContainer">
      <PageTitleSmall textColor="#0998C0" title="Introduction à GraphQl" />
      <div className="forumHeadingContainer">
        <button
          className="writeAQuestionButton"
          type="button"
          onClick={() => takeMeToQuestionEditor()}
        >
          Ecrire une question
        </button>
      </div>
      {data?.getFlashcard.question.map((question: IQuestion) => {
        return (
          <QuestionBlock
            answer={question.answer}
            id={question.id}
            date={question.date}
            text={question.text}
            key={question.id}
          />
        );
      })}
      <div className="forumEditorWrapper" ref={questionEditorRef}>
        <ForumEditorBlock
          placeHolderText="Ecrire ma question"
          onSubmitCallback={(event: FormEvent<HTMLFormElement>) =>
            submitQuestion(event)
          }
        />
      </div>
=======
import { useCallback, useState } from 'react';
import { conformsTo, debounce, remove } from 'lodash';
=======
import { useCallback, useState, useEffect } from 'react';
import { debounce } from 'lodash';
>>>>>>> f19e55f (+ forum cells structure and search control)
import search from '../assets/search.svg';
import './forum.scss';
import PageTitle from '../component/PageTitle';
import forumIcon from '../assets/forumCellIcon.svg';
import closeIcon from '../assets/close.svg';
import formattedDate from '../utils/dateFormatted';

interface IForumResponse {
  title: string;
  flashcardId: string;
  question: any[];
  subjectId: string;
  date: Date;
}

interface IForumCellProps {
  title: string;
  flashcardId: string;
  question: any[];
  subjectId: string;
  date: Date;
}

const apiResponse: IForumResponse[] = [
  {
    subjectId: '1',
    flashcardId: '1',
    question: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    title: 'Introduction à GraphQL',
    date: new Date(),
  },
  {
    subjectId: '1',
    flashcardId: '2',
    question: ['a', 'a', 'a', 'a', 'a'],
    title: 'title2',
    date: new Date(),
  },
  {
    subjectId: '1',
    flashcardId: '3',
    question: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    title: 'Introduction à GraphQL Introduction',
    date: new Date(),
  },
  {
    subjectId: '1',
    flashcardId: '4',
    question: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    title: 'title4',
    date: new Date(),
  },
  {
    subjectId: '1',
    flashcardId: '5',
    question: ['a', 'a'],
    title: 'title5',
    date: new Date(),
  },
  {
    subjectId: '1',
    flashcardId: '6',
    question: ['a', 'a', 'a'],
    title: 'title6',
    date: new Date(),
  },
  {
    subjectId: '1',
    flashcardId: '7',
    question: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    title: 'title7',
    date: new Date(),
  },
];

export default function Forum() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchInputDelayed, setSearchInputDelayed] = useState<string>('');
  useState<IForumResponse[]>(apiResponse);
  const [searchResults, setSearchResults] =
    useState<IForumResponse[]>(apiResponse);
  const [tags, setTags] = useState<string[]>([]);

  // TAGS controller
  // ======================================================================
  const addTag = (tag: string) => {
    setTags([...tags, tag]);
  };

  const removeTag = (tag: string) => {
    const index = tags.indexOf(tag);
    if (index > -1) {
      setTags(tags.filter((singleTag: string) => singleTag !== tag));
    }
  };

  // debouncing search input
  // ======================================================================
  const filter = (text: string) => {
    setSearchInputDelayed(text);
    if (searchResults) {
      addTag(text);
      setSearchInput('');
    }
  };

  const debounceSearchInput = useCallback(
    debounce((text: string) => filter(text), 600),
    [],
  );

  const handleSearchInputChange = (text: string) => {
    setSearchInput(text);
    debounceSearchInput(text);
  };
  // ======================================================================

  const ForumCell = ({
    flashcardId,
    question,
    subjectId,
    title,
    date,
  }: IForumCellProps) => {
    const questionsNumber = question.length;
    const dateFormatted = formattedDate(date);

    return (
      <div className="forumCellContainer">
        <div className="forumCellTitleContainer">
          <div className="forumCellTitle">{title}</div>
          <img className="forumCellIcon" src={forumIcon} alt="forumIcon" />
        </div>
        <div className="forumCellDetailedinfoContianer">
          <span>{questionsNumber} Questions</span>
          <span>{dateFormatted}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="forumSearchPageContainer">
      <PageTitle textColor="#0998C0" title="Forums" />
      <div className="forumSearchInputContainer">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => handleSearchInputChange(e.target.value)}
        />
        <img src={search} alt="chercher un tag" />
      </div>

      {searchInputDelayed.length === 0 ? (
        <div className="forumGreetings">
          Taper les mots clefs qui correspondent à vos recherches
        </div>
      ) : (
        <div>
          {tags.map((singleTag: string, index: number) => {
            return (
              <div className="singleTagContainer" key={index}>
                <div className="singleTag">
                  <div className="tagText">{singleTag}</div>
                  <button
                    className="tagCloseButton"
                    type="button"
                    onClick={() => removeTag(singleTag)}
                  >
                    <img src={closeIcon} alt="close icon" />
                  </button>
                </div>
              </div>
            );
          })}
          <div>
            {searchResults && searchResults.length === 0 ? (
              <div className="forumGreetings">
                Aucun resultat n&apos;a été trouvé
              </div>
            ) : (
              searchResults &&
              searchResults.map(
                (singleForum: IForumResponse, index: number) => {
                  return (
                    <ForumCell
                      key={index}
                      title={singleForum.title}
                      date={singleForum.date}
                      flashcardId={singleForum.flashcardId}
                      subjectId={singleForum.subjectId}
                      question={singleForum.question}
                    />
                  );
                },
              )
            )}
          </div>
        </div>
      )}
>>>>>>> 5441c27 (+ forum)
    </div>
  );
}

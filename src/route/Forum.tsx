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
    window.alert('inputText');
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
    </div>
  );
}

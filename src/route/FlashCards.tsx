import './FlashCards.scss';
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_FLASHCARDS_BY_SUBJECTS } from '../utils/graphqlRequest';

export default function FlashCards() {
  const { matiere }: { matiere: string } = useParams();

  const [subject, setSubject] = useState('');
  // setSubject(matiere);

  // const flashcardsSubject = useMutation(ALL_FLASHCARDS_BY_SUBJECTS, {
  //  onCompleted: (value) => {
  //    setSubject(value.subject.flashcard);
  // },
  // onError: () => {
  // setError(true);
  // },
  // });
  // console.log(flashcardsSubject);

  const { loading, error, data } = useQuery(ALL_FLASHCARDS_BY_SUBJECTS);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! </div>;

  const flashCardsBySubjectData = {
    classroomId: '1',
    name: 'Développement Web Lyon',
    year: '2021/2022',
    subject: [
      {
        id: '1',
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
  };

  return (
    <>
      <h1>{matiere}</h1>
      <div className="flashcard-list">
        {flashCardsBySubjectData?.subject.map((element: any) => (
          <div
            data-testid={element.id}
            className="flashcard-element"
            key={element.id}
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

import { FormEvent, useState } from 'react';
import { IQuestion } from '../utils/interface';
import formattedDate from '../utils/dateFormatted';
import './questionBlock.scss';
// icons imports
// ==========================================
import answerIcon from '../assets/answerIcon.svg';
import arrowDown from '../assets/arrowdown.svg';
import arrowUp from '../assets/arrowup.svg';
import AnswerBlock from './AnswerBlock';
import ForumEditorBlock from './ForumEditorBlock';
// ==========================================

export default function QuestionBlock({
  id,
  author,
  date,
  text,
  answer,
}: IQuestion) {
  // ============================================
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const showQuestionAnswers = () => {
    setIsOpen(!isOpen);
  };

  const sbmitAnswer = (
    event: FormEvent<HTMLFormElement>,
    questionId: string,
  ) => {
    event.preventDefault();
    window.alert(questionId);
  };

  // ============================================
  return (
    <div className="questionBlockWrappaer">
      <button
        onClick={() => showQuestionAnswers()}
        type="button"
        className="questionBlockContainer"
      >
        <div className="questionHeadingContainer">
          <h3>{text}</h3>
          <img
            src={isOpen ? arrowUp : arrowDown}
            alt="Voir ou cacher les reponses"
          />
        </div>
        <div className="questionSecondaryDataContainer">
          <div>{author}</div>
          <div>{formattedDate(date)}</div>
          <div>
            <div>{answer.length}</div>
            <img src={answerIcon} alt="nombre de réponses" />
          </div>
        </div>
      </button>
      <div
        className="answersContainer"
        style={{ display: `${isOpen ? 'block' : 'none'}` }}
      >
        {answer.map((singleAnswer) => {
          return (
            <AnswerBlock
              key={singleAnswer.id}
              text={singleAnswer.text}
              id={singleAnswer.id}
              author={singleAnswer.author}
              date={singleAnswer.date}
            />
          );
        })}
        <ForumEditorBlock
          onSubmitCallback={(e: FormEvent<HTMLFormElement>) =>
            sbmitAnswer(e, id)
          }
          placeHolderText="Ecrire ma réponse"
        />
      </div>
    </div>
  );
}
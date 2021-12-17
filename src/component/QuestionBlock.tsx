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

interface IQuestionBlockProps extends IQuestion {
  submitAnswerCallback: Function;
}

export default function QuestionBlock({
  id,
  date,
  text,
  answer,
  submitAnswerCallback,
}: IQuestionBlockProps) {
  // ============================================
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const showQuestionAnswers = () => {
    setIsOpen(!isOpen);
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
          <div>{formattedDate(new Date(date))}</div>
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
              date={singleAnswer.date}
            />
          );
        })}
        <ForumEditorBlock
          questionId={id}
          onSubmitCallback={submitAnswerCallback}
          placeHolderText="Ecrire ma réponse"
        />
      </div>
    </div>
  );
}

import { IAnswer } from '../utils/interface';
import formattedDate from '../utils/dateFormatted';
import './answerBlock.scss';

<<<<<<< HEAD
export default function AnswerBlock({ date, id, text }: IAnswer) {
  return (
    <div className="asnwerContainer">
      <div className="answerHeading">{formattedDate(date)}</div>
=======
export default function AnswerBlock({ author, date, id, text }: IAnswer) {
  return (
    <div className="asnwerContainer">
      <div className="answerHeading">
        <span>{author}</span>
        <span>{formattedDate(date)}</span>
      </div>
>>>>>>> 8aaa6ce (+ answer block component)
      <p className="answerText">{text}</p>
    </div>
  );
}

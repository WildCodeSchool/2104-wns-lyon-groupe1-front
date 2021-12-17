import { IAnswer } from '../utils/interface';
import formattedDate from '../utils/dateFormatted';
import './answerBlock.scss';

export default function AnswerBlock({ author, date, id, text }: IAnswer) {
  return (
    <div className="asnwerContainer">
      <div className="answerHeading">
        <span>{author}</span>
        <span>{formattedDate(date)}</span>
      </div>
      <p className="answerText">{text}</p>
    </div>
  );
}

import { IAnswer } from '../utils/interface';
import formattedDate from '../utils/dateFormatted';
import './answerBlock.scss';

export default function AnswerBlock({ date, id, text }: IAnswer) {
  return (
    <div className="asnwerContainer">
      <div className="answerHeading">{formattedDate(date)}</div>
      <p className="answerText">{text}</p>
    </div>
  );
}

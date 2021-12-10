import forumCellIcon from '../assets/forumCellIcon.svg';

interface IForumCellProps {
  classroomId: string;
  subjectId: string;
  flashcardId: string;
  title: string;
  questionsNumber: number;
  postDate: string;
}

export default function ForumCell({
  classroomId,
  subjectId,
  flashcardId,
  title,
  questionsNumber,
  postDate,
}: IForumCellProps) {
  return <div>Forum cell</div>;
}

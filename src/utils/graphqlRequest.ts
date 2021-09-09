import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Connection($mail: String!, $password: String!) {
    user(mail: $mail, password: $password) {
      id
      firstname
      lastname
      isTeacher
      mail
      classroom {
        classroomId
        name
        year
      }
    }
  }
`;

export const SIGNIN = '';

export const CREATE_CLASSROOM = gql`
  mutation CreateClassroom($name: String!, $year: String!) {
    classroom(name: $name, year: $year) {
      classroomId
      name
      year
    }
  }
`;

export const ALL_SUBJECTS = gql`
  query getSubjects {
    subject {
      id
      title
    }
  }
`;

export const ALL_FLASHCARDS_BY_SUBJECTS = gql`
  mutation getAllFlashcardsBySubject($subjectTitle: String!) {
    subject(title: $subjectTitle) {
      id
      title
      flashcard {
        id
        title
      }
    }
  }
`;

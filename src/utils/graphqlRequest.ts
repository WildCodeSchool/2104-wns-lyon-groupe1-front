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

export const GET_CLASSROOM_BY_ID = gql`
  query getClassroomById($classroomId: ID!) {
    classroom(classroomId: $classroomId) {
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
      name
      imageUrl
    }
  }
`;

export const ALL_SUBJECTS_BY_CLASSROOM = gql`
  query getAllSubjectsByClassroom($classroomId: ID!) {
    classroom(classroomId: $classroomId) {
      classroomId
      subject {
        subjectId
        name
        imageUrl
      }
    }
  }
`;

export const ALL_FLASHCARDS_BY_SUBJECTS = gql`
  query getAllFlashcardsBySubject($classroomId: ID!, $subjectName: String!) {
    classroom(classroomId: $classroomId, subjectName: $subjectName) {
      classroomId
      subject {
        subjectId
        name
        imageUrl
      }
    }
  }
`;

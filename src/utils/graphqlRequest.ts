import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Connection($mail: String!, $password: String!) {
    login(mail: $mail, password: $password) {
      id
      token
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

export const CHECK_LOGIN = gql`
  mutation VerifConnection {
    checklogin {
      id
      token
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

export const CREATE_CLASSROOM = gql`
  mutation CreateClassroom($name: String!, $year: String!, $mails: [String!]!) {
    addClassroom(name: $name, year: $year, mails: $mails) {
      id
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
  query getAllFlashcardsBySubject($classroomId: ID!, $subjecId: ID!) {
    classroom(classroomId: $classroomId, subjectId: $subjecId) {
      classroomId
      subject {
        subjectId
        name
        imageUrl
      }
    }
  }
`;

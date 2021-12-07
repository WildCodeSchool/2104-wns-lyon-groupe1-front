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
  mutation addClassroom($name: String!, $year: String!, $mails: [String!]!) {
    addClassroom(
      classroomName: $name
      academicYear: $year
      studentMails: $mails
    ) {
      id
      name
      year
    }
  }
`;

export const ADD_STUDENT_TO_CLASSROOM = gql`
  mutation addStudentToClassroom($classroomId: String!, $studentMail: String!) {
    addStudentToClassroom(id: $classroomId, studentMail: $studentMail) {
      id
      student {
        mail
      }
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

export const GET_CLASSROOM_STUDENTS = gql`
  query getClassroom($classroomId: String!) {
    getClassroom(id: $classroomId) {
      student {
        userId
        firstname
        lastname
        mail
      }
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

export const GET_ALL_SUBJECTS = gql`
query getAllSubjects() {
    subject {
      id
      name
      imageUrl
    }
}
`;

export const ALL_SUBJECTS_BY_CLASSROOM = gql`
  query getAllSubjectsByClassroom($classroomId: String!) {
    getAllSubjectsByClassroom(classroomId: $classroomId) {
      id
      name
      imageUrl
    }
  }
`;

export const ALL_FLASHCARDS_BY_SUBJECTS = gql`
  query getAllFlashcardsBySubject($classroomId: String!, $subjectId: String!) {
    getAllFlashcardsBySubject(
      classroomId: $classroomId
      subjectId: $subjectId
    ) {
      id
      flashcard {
        id
        title
      }
    }
  }
`;

export const GET_FLASHCARD_BY_ID = gql`
  query getFlashcard($flashcardId: String!, $classroomId: String!) {
    getFlashcard(flashcardId: $flashcardId, classroomId: $classroomId) {
      id
      title
      tag
      ressource {
        id
        name
        url
      }
      subtitle {
        id
        title
        position
        paragraph {
          id
          text
          isValidate
          isPublic
          author
          date
        }
      }
    }
  }
`;

export const UPDATE_FLASHCARD_STUDENT = gql`
  mutation UpdateFlashcardParagraph(
    $classroomId: ID!
    $subjectId: ID!
    $flashcardId: ID!
    $subtitleId: ID!
    $paragraph: ParagraphInput
    $ressource: RessourceInput
  ) {
    updateFlashcardStudent(
      classroomId: $classroomId
      subjectId: $subjectId
      flashcardId: $flashcardId
      subtitleId: $subtitleId
      paragraph: $paragraph
      ressource: $ressource
    ) {
      id
      title
      tag
      ressource {
        name
        url
      }
      subtitle {
        id
        title
        position
        paragraph {
          id
          text
          isValidate
          isPublic
          author
          date
        }
      }
    }
  }
`;

export const CHANGE_PASSWORD_STUDENT = gql`
  mutation changePassword($newPassword: String!, $oldPassword: String!) {
    changePassword(newPassword: $newPassword, oldPassword: $oldPassword)
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($mail: String!) {
    resetPassword(mail: $mail)
  }
`;
export const CREATE_FLASHCARD = gql`
  mutation createFlashcard(
    $classroomId: ID!
    $subjectId: ID!
    $title: String!
    $ressource: [RessourceInput!]
    $tag: [String]
    $subtitle: [SubtitleInput!]
  ) {
    classroom(
      classroomId: $classroomId
      subjectId: $subjectId
      title: $title
      ressource: $ressource
      tag: $tag
      subtitle: $subtitle
    ) {
      id
      title
      subtitle {
        title
        position
      }
      tag
      ressource {
        name
        url
      }
    }
  }
`;

export const UPDATE_FLASHCARD = gql``;

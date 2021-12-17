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

export const SEARCH_FORUMS = gql`
  query getAllFlashcards($classroomId: String!, $tags: [String!]) {
    getAllFlashcards(classroomId: $classroomId, tag: $tags) {
      id
      subjectId
      title
      tag
      question {
        id
        text
        date
      }
    }
  }
`;

export const GET_FLASHCARD_FORUM = gql`
  query getFlashcard($flashcardId: String!, $classroomId: String!) {
    getFlashcard(flashcardId: $flashcardId, classroomId: $classroomId) {
      id
      title
      question {
        id
        text
        date
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

// post answer by passing only answer OR post question by only passing the question
export const UPDATE_FLASHCARD_FORUM = gql`
  mutation updateFlashcardForum(
    $classroomId: ID!
    $subjectId: ID!
    $flashcardId: ID!
    $answer: AnswerInput
    $question: QuestionInput
  ) {
    updateFlashcardStudent(
      classroomId: $classroomId
      subjectId: $subjectId
      flashcardId: $flashcardId
      answer: $answer
      question: $question
    ) {
      id
      title
      subjectId
      question {
        id
        text
        date
        author
        answer {
          text
          date
          author
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
    $answer: AnswerInput
    $question: QuestionInput
  ) {
    updateFlashcardStudent(
      classroomId: $classroomId
      subjectId: $subjectId
      flashcardId: $flashcardId
      subtitleId: $subtitleId
      paragraph: $paragraph
      ressource: $ressource
      answer: $answer
      question: $question
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
      question {
        id
        text
        date
        author
        answer {
          text
          date
          author
        }
      }
    }
  }
`;

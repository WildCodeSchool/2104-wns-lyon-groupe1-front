export interface IStudent {
  userId: string;
  firstname?: string;
  lastname?: string;
  mail: string;
}

export interface IClassroom {
  name: string;
  year: string;
  classroomId: string;
}

export interface ISubject {
  id?: string;
  imageUrl?: string;
  name?: string;
}

export interface IClassroomStudent extends IClassroom {
  student: IStudent[];
}
export interface IClassroomSubject extends IClassroom {
  subject: ISubject[];
}

export interface IUser {
  id?: string;
  firstname?: string;
  lastname?: string;
  isTeacher?: boolean;
  mail?: string;
  classroom?: IClassroom;
}

export interface IUserContext {
  user: IUser;
  addUser: (user: IUser) => void;
  removeUser: () => void;
}
export interface IParagraph {
  id: string;
  text: string;
  isValidate: boolean;
  isPublic: boolean;
  author: string;
  date: string;
}

export interface ISubtitle {
  id: string;
  title: string;
  position: number;
  paragraph?: IParagraph[];
}

export interface IRessource {
  id: string;
  name: string;
  url: string;
}

export interface IAnswer {
  id: string;
  text: string;
  author: string;
  date: Date;
}

export interface IQuestion {
  id: string;
  text: string;
  answer: IAnswer[];
  date: Date;
  author: string;
}

export interface IFlashcard {
  id: string;
  title: string;
  tag?: string[];
  subtitle?: ISubtitle[];
  ressource?: IRessource[];
  question: IQuestion[];
}

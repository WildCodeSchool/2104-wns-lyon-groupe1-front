export interface IStudent {
  userId: string;
  firstname?: string;
  lastname?: string;
  mail: string;
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
export interface IClassroom {
  id?: string; // received as a response when a classroom is added, // we are getting {id, name, year} not {classroomId, name, year}
  name: string;
  year: string;
  classroomId: string;
  student: IStudent[];
  subject: ISubject[];
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
  classroom?: Omit<IClassroom, 'subject' | 'student'>;
}

export interface IUserContext {
  user: IUser;
  addUser: (user: IUser) => void;
  removeUser: () => void;
  addUserClassroom: (newClassroom: IClassroom) => void;
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

export interface IFlashcard {
  id: string;
  title: string;
  tag?: string[];
  subtitle?: ISubtitle[];
  ressource?: IRessource[];
}

export interface ISubject {
  id?: string;
  imageUrl?: string;
  name?: string;
}
interface IParagraph {
  text: string;
  isValidate: boolean;
  isPublic: boolean;
  author: string;
  date: string;
}

interface ISubtitle {
  title: string;
  position: number;
  paragraph?: IParagraph[];
}

interface IRessource {
  name: string;
  url: string;
}

export interface IFlashcard {
  id: string;
  title: string;
  tag?: string[];
  subtitle?: ISubtitle[];
  ressource?: IRessource[];
}

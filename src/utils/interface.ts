import { Dispatch, SetStateAction } from 'react';

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

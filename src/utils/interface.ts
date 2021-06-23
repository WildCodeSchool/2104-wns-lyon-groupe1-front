export interface IClassroom {
  name: string;
  year: string;
  id: string;
}
export interface IUser {
  id?: string;
  firstname?: string;
  lastname?: string;
  isTeacher?: boolean;
  email?: string;
  classroom?: IClassroom;
}

export interface IClassroom {
  name: string;
}
export interface IUser {
  id?: string;
  firstname?: string;
  lastname?: string;
  isTeacher?: boolean;
  email?: string;
  classroom?: IClassroom;
}

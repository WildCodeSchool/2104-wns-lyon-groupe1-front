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
export interface IUser {
  id?: string;
  firstname?: string;
  lastname?: string;
  isTeacher?: boolean;
  email?: string;
  classroom?: IClassroom;
}

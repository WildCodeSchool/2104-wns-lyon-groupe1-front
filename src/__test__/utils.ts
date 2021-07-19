import { IUser } from '../utils/interface';

export const connectUserStudent: IUser = {
  id: '1',
  firstname: 'John',
  lastname: 'Doe',
  isTeacher: false,
  email: 'nicolas.legrand@aze.com',
  classroom: {
    name: 'Développement web Lyon',
    year: '2021/2022',
    classroomId: '1',
  },
};

export const connectUserTeacher: IUser = {
  id: '1',
  firstname: 'John',
  lastname: 'Doe',
  isTeacher: true,
  email: 'nicolas.legrand@aze.com',
  classroom: {
    name: 'Développement web Lyon',
    year: '2021/2022',
    classroomId: '1',
  },
};

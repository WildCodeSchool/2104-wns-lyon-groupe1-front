import { IUser } from '../utils/interface';

export const connectUserStudent: IUser = {
  id: '1',
  firstname: 'John',
  lastname: 'Doe',
  isTeacher: false,
  mail: 'nicolas.legrand@aze.com',
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
  mail: 'nicolas.legrand@aze.com',
  classroom: {
    name: 'Développement web Lyon',
    year: '2021/2022',
    classroomId: '1',
  },
};

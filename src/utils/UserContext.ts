import { createContext, useState } from 'react';
import { IClassroom, IUser, IUserContext } from './interface';

export function useUserContext(data: IUser = {}): [IUser, any, any, any] {
  const [user, setUser] = useState<IUser>(data || {});

  const addUser = (inputUser: IUser) => {
    setUser(inputUser);
  };

  const addUserClassroom = (newClassroom: IClassroom) => {
    const userClone = { ...user };
    setUser({
      ...userClone.classroom,
      classroom: {
        classroomId: newClassroom.id || '',
        year: newClassroom.year || '',
        name: newClassroom.name || '',
      },
    });
  };

  const removeUser = () => {
    setUser({});
  };

  return [user, addUser, removeUser, addUserClassroom];
}

export const UserContext = createContext<IUserContext>({
  user: {},
  addUser: () => {
    throw new Error('SetUser is not implemented');
  },
  removeUser: () => {
    throw new Error('SetUser is not implemented');
  },
  addUserClassroom: () => {
    throw new Error('addUserClassroom is not implemented');
  },
});

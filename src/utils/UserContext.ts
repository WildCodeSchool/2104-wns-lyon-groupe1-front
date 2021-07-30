import { createContext, useState } from 'react';
import { IUser, IUserContext } from './interface';

export function useUserContext(data: IUser = {}): [IUser, any, any] {
  const [user, setUser] = useState<IUser>(data || {});

  const addUser = (inputUser: IUser) => {
    setUser(inputUser);
  };

  const removeUser = () => {
    setUser({});
  };

  return [user, addUser, removeUser];
}

export const UserContext = createContext<IUserContext>({
  user: {},
  addUser: () => {
    throw new Error('SetUser is not implemented');
  },
  removeUser: () => {
    throw new Error('SetUser is not implemented');
  },
});

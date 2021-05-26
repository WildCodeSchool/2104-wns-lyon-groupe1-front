import bubbleMessage from '../assets/bubblemessage.svg';
import newspaper from '../assets/newspaper.svg';
import Button from './Button';
import SearchBar from './SearchBar';
import './Home.scss';

export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  isTeacher: boolean;
}

const userFromApi: IUser = {
  id: '1',
  firstname: 'John',
  lastname: 'Doe',
  isTeacher: true,
};

const buttons = [
  {
    title: userFromApi.isTeacher ? 'Mes fiches de révision' : 'Mes matières',
    icon: newspaper,
    classname: 'yellow-btn',
  },
  {
    title: 'Forums',
    icon: bubbleMessage,
    classname: 'blue-btn',
  },
  {
    title: 'Mon espace',
    icon: null,
    classname: 'green-btn',
  },
];

export default function Home() {
  return (
    <div className="Home">
      <SearchBar />
      <h2>Bonjour {userFromApi.firstname} !</h2>
      {buttons.map((button) => (
        <Button
          key={button.title}
          title={button.title}
          classname={button.classname}
          icon={button.icon}
        />
      ))}
    </div>
  );
}

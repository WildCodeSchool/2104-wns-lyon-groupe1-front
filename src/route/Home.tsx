import { useContext } from 'react';
import { IUser } from '../utils/interface';
import bubbleMessage from '../assets/bubblemessage.svg';
import newspaper from '../assets/newspaper.svg';
import Button from '../component/Button';
import SearchBar from '../component/SearchBar';
import './Home.scss';
import UserContext from '../utils/UserContext';

export default function Home() {
  const user: IUser = useContext(UserContext);

  const buttons = [
    {
      title: user.isTeacher ? 'Mes fiches de révision' : 'Mes matières',
      icon: newspaper,
      classname: 'yellow-btn',
      slug: user.isTeacher ? '/mes-fiches-de-revisions' : '/mes-matières',
    },
    {
      title: 'Forums',
      icon: bubbleMessage,
      classname: 'blue-btn',
      slug: '/forum',
    },
    {
      title: 'Mon espace',
      icon: null,
      classname: 'green-btn',
      slug: '/mon-espace',
    },
  ];

  return (
    <div className="Home">
      <SearchBar />
      <h2>Bonjour {user.firstname} !</h2>
      {buttons.map((button) => (
        <Button
          key={button.title}
          title={button.title}
          classname={button.classname}
          icon={button.icon}
          slug={button.slug}
        />
      ))}
    </div>
  );
}

import { useHistory } from 'react-router-dom';
import './Button.scss';

type PropsButton = {
  title: string;
  icon: string | null;
  classname: string;
  slug: string;
};

export default function Button({ title, icon, classname, slug }: PropsButton) {
  const history = useHistory();

  return (
    <button
      type="button"
      onClick={() => history.push(slug)}
      className={`button ${classname}`}
    >
      <h3>{title}</h3>
      {icon && <img src={icon} alt={title} />}
    </button>
  );
}

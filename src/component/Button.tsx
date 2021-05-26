import './Button.scss';

type PropsButton = {
  title: string;
  icon: string | null;
  classname: string;
};

export default function Button({ title, icon, classname }: PropsButton) {
  return (
    <div className={`button ${classname}`}>
      <h3>{title}</h3>
      {icon && <img src={icon} alt={title} />}
    </div>
  );
}

interface IPageTitleProps {
  title: string;
  textColor: string;
}

export default function PageTitle({ title, textColor }: IPageTitleProps) {
  return (
<<<<<<< HEAD
    <h1
      className="customPageTitle"
      style={{ color: `${textColor}`, textAlign: 'center' }}
    >
=======
    <h1 className="customPageTitle" style={{ color: `${textColor}` }}>
>>>>>>> d0b1243 (+ page title component)
      {title}
    </h1>
  );
}

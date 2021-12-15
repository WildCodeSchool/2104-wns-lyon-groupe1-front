interface IPageTitleProps {
  title: string;
  textColor: string;
}

export default function PageTitle({ title, textColor }: IPageTitleProps) {
  return (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f19e55f (+ forum cells structure and search control)
    <h1
      className="customPageTitle"
      style={{ color: `${textColor}`, textAlign: 'center' }}
    >
<<<<<<< HEAD
=======
    <h1 className="customPageTitle" style={{ color: `${textColor}` }}>
>>>>>>> d0b1243 (+ page title component)
=======
>>>>>>> f19e55f (+ forum cells structure and search control)
      {title}
    </h1>
  );
}

interface IPageTitleProps {
  title: string;
  textColor: string;
}

export default function PageTitle({ title, textColor }: IPageTitleProps) {
  return (
    <h1
      className="customPageTitle"
      style={{ color: `${textColor}`, textAlign: 'center' }}
    >
      {title}
    </h1>
  );
}

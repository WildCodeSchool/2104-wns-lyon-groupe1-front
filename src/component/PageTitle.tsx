interface IPageTitleProps {
  title: string;
  textColor: string;
}

export default function PageTitle({ title, textColor }: IPageTitleProps) {
  return (
    <h1 className="customPageTitle" style={{ color: `${textColor}` }}>
      {title}
    </h1>
  );
}

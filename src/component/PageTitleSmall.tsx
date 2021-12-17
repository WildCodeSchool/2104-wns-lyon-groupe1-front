interface IPageTitleSmallProps {
  title: string;
  textColor: string;
}

export default function PageTitleSmall({
  title,
  textColor,
}: IPageTitleSmallProps) {
  return (
    <h2
      className="customPageTitle"
      style={{ color: `${textColor}`, textAlign: 'center' }}
    >
      {title}
    </h2>
  );
}

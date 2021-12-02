import React from 'react';

interface ITagsOrganizerProps {
  tags: string[];
  removeTagCallback: CallableFunction;
}

export default function TagsOrganizer({
  tags,
  removeTagCallback,
}: ITagsOrganizerProps) {
  const Tag = ({ text }: any) => {
    return (
      <div>
        <div>
          <div>{text}</div>
          <button type="button" onClick={() => removeTagCallback(text)}>
            Supprimer un tag
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {tags.map((tag: string, i) => {
        return <Tag key={i} text={tag} />;
      })}
    </div>
  );
}

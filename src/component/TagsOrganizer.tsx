import React from 'react';
import cross from '../assets/cross.svg';
import './TagsOrganizer.scss';

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
      <div className="singleTag">
        <p>#{text}</p>
        <img
          src={cross}
          alt="supprimer le tag"
          onClick={() => removeTagCallback(text)}
          aria-hidden="true"
        />
      </div>
    );
  };

  return (
    <div className="allTags-list">
      {tags.map((tag: string, i) => {
        return <Tag key={i} text={tag} />;
      })}
    </div>
  );
}

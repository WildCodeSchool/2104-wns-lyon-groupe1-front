import React from 'react';

interface IRessources {
  name: string;
  url: string;
}

export default function Ressource({ name, url }: IRessources) {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      {name}
    </a>
  );
}

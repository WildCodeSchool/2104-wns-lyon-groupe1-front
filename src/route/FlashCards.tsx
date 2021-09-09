import React from 'react';
import { useParams } from 'react-router-dom';

export default function FlashCards() {
  const { matiere }: { matiere: string } = useParams();

  return (
    <>
      <h1>Toutes les fiches {matiere}</h1>
    </>
  );
}

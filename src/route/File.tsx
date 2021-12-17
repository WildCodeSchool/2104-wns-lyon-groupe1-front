import './File.scss';
import { Link } from 'react-router-dom';

export default function File() {
  return (
    <>
      <div className="my-flashcards">
        <h1> Mes fiches de révision</h1>
        <Link to="/ajouter-une-fiche">
          <button type="button" className="button flashcard-creation-btn">
            Créer une fiche
          </button>
        </Link>
      </div>
    </>
  );
}

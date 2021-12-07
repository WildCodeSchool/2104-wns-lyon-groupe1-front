import { useState, FormEvent, useEffect } from 'react';
import { IParagraph } from '../utils/interface';

export default function EditBlock({
  isRessource,
  pos,
  paragraphUpdate,
  handleParagraphUpdate,
  handleEdit,
  subId,
}: {
  isRessource: boolean;
  pos: number;
  paragraphUpdate: IParagraph | null;
  handleParagraphUpdate: Function;
  handleEdit: Function;
  subId: string;
}) {
  const [text, setText] = useState('');
  const [id, setIdParagraphUpdate] = useState<null | string>(null);
  const [url, setUrl] = useState('');
  const [isPublic, setPublic] = useState(true);
  useEffect(() => {
    if (paragraphUpdate) {
      setText(paragraphUpdate.text);
      setIdParagraphUpdate(paragraphUpdate.id);
      setPublic(paragraphUpdate.isPublic);
    }
  }, [paragraphUpdate]);

  const clearForm = (): void => {
    setText('');
    setUrl('');
    setPublic(true);
    setIdParagraphUpdate(null);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isRessource) {
      handleEdit(text, url);
    } else {
      handleEdit(subId, id, isPublic, text);
      handleParagraphUpdate(null);
    }
    clearForm();
  };
  return (
    <form className="block-edit" onSubmit={handleSubmit}>
      {isRessource ? (
        <div className="ressource_edit">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Nom de la ressource"
            required
          />
          <input
            type="text"
            placeholder="Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
      ) : (
        <textarea
          title="Edit Block"
          placeholder="Ajouter un paragraphe"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      )}
      <div className="edit-button-action">
        <button type="button" onClick={() => clearForm()} className="red">
          Annuler
        </button>
        <button type="submit" className="green">
          Soumettre
        </button>
        {!isRessource && (
          <div className="checkbox">
            <input
              type="checkbox"
              id={isRessource ? 'ressource_chk' : `${pos.toString()}_chk`}
              checked={isPublic}
              onChange={() => setPublic((prev) => !prev)}
            />
            <label
              htmlFor={isRessource ? 'ressource_chk' : `${pos.toString()}_chk`}
            >
              {isPublic ? 'publique' : 'privé'}
            </label>
          </div>
        )}
      </div>
    </form>
  );
}

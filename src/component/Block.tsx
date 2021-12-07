import { useState, useEffect, useContext } from 'react';
import './Block.scss';
import { UserContext } from '../utils/UserContext';
import { IParagraph, IRessource } from '../utils/interface';
import EditBlock from './EditBlock';
import up from '../assets/arrowup.svg';
import down from '../assets/arrowdown.svg';
import lock from '../assets/lock.svg';
import confirm from '../assets/confirm.svg';
import pencil from '../assets/pencil.svg';

type PropsBlock = {
  title: string;
  paragraph?: IParagraph[] | undefined;
  ressource?: IRessource[] | undefined;
  edit: boolean;
  position: number;
  actionVisibility: Function;
  actionValidation: Function;
  handleEdit: Function;
  handleEditRessource: Function;
  subtitleId: string;
};

const defaultProps: Partial<PropsBlock> = {
  paragraph: undefined,
  ressource: undefined,
};

export default function Block({
  title,
  paragraph,
  ressource,
  edit,
  position,
  actionVisibility,
  actionValidation,
  handleEdit,
  subtitleId,
  handleEditRessource,
}: PropsBlock) {
  const [show, setShow] = useState(false);
  const [isValidate, setValidate] = useState(false);
  const [paragraphUpdate, setParagraphUpdate] = useState<null | IParagraph>(
    null,
  );
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (paragraph?.every((p) => p.isValidate)) {
      setValidate(true);
    }
  }, []);
  return (
    <div className={`block ${(edit || show) && 'anim-paragraph'}`}>
      <div className="block-header">
        <button
          className="btn-header"
          type="button"
          onClick={() => {
            setShow((prev) => !prev);
          }}
        >
          <h3>{title}</h3>
          {edit &&
            (isValidate ? <p>Validé</p> : <p className="yellow">En attente</p>)}
          <img src={show ? up : down} alt="Déplier le menu" />
        </button>
      </div>

      {paragraph?.map((p, idx) => (
        <div
          key={`${idx}-${title}-${p.text}`}
          className={`block-paragraph ${
            edit && (p.isValidate ? 'green' : 'orange')
          }`}
        >
          <p>
            {edit && (
              <button type="button" onClick={() => setParagraphUpdate(p)}>
                <img
                  src={pencil}
                  className="icon-start"
                  alt="Modifier le paragrpahe"
                />
              </button>
            )}
            {!p.isPublic && (
              <button
                type="button"
                disabled={!edit}
                onClick={() => actionVisibility(subtitleId, p.id)}
              >
                <img
                  src={lock}
                  className="icon-start"
                  alt="Visible que par moi"
                />
              </button>
            )}
            {p.text}
          </p>
          {edit && !p.isValidate && p.author !== user.id && (
            <button
              type="button"
              onClick={() => actionValidation(subtitleId, p.id)}
            >
              <img src={confirm} className="icon-end" alt="Validé" />
            </button>
          )}
        </div>
      ))}

      {ressource?.map((p) => (
        <div key={`${title}-${p.name}-${p.url}`} className="block-paragraph">
          <a href={p.url} target="_blank" rel="noreferrer">
            {p.name}
          </a>
        </div>
      ))}
      {edit && (
        <EditBlock
          pos={position}
          isRessource={ressource !== undefined}
          paragraphUpdate={paragraphUpdate}
          handleParagraphUpdate={setParagraphUpdate}
          handleEdit={ressource ? handleEditRessource : handleEdit}
          subId={subtitleId}
        />
      )}
    </div>
  );
}

Block.defaultProps = defaultProps;

import { useState, useEffect } from 'react';
import './Block.scss';
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
}: PropsBlock) {
  const [show, setShow] = useState(false);
  const [isValidate, setValidate] = useState(false);
  const [paragraphUpdate, setParagraphUpdate] = useState<null | IParagraph>(
    null,
  );

  useEffect(() => {
    if (paragraph?.every((p) => p.isValidate)) {
      setValidate(true);
    }
  }, []);

  return (
    <div className={`block ${show && 'anim-paragraph'}`}>
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
              <img
                src={lock}
                className="icon-start"
                alt="Visible que par moi"
              />
            )}
            {p.text}
          </p>
          {edit && !p.isValidate && (
            <button
              type="button"
              onClick={() => console.log('valider le paragraph')}
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
        />
      )}
    </div>
  );
}

Block.defaultProps = defaultProps;

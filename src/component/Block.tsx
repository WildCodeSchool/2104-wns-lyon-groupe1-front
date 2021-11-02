import { useState } from 'react';
import './Block.scss';
import up from '../assets/arrowup.svg';
import down from '../assets/arrowdown.svg';
import lock from '../assets/lock.svg';

type PropsParagraph = {
  text: string;
  isValidate: boolean;
  isPublic: boolean;
};

type PropsRessource = {
  name: string;
  url: string;
};

type PropsBlock = {
  title: string;
  paragraph?: PropsParagraph[] | undefined;
  ressource?: PropsRessource[] | undefined;
};

const defaultProps: Partial<PropsBlock> = {
  paragraph: [],
  ressource: [],
};

export default function Block({ title, paragraph, ressource }: PropsBlock) {
  const [show, setShow] = useState(false);
  return (
    <div className={`block ${show && 'anim-paragraph'}`}>
      <div className="block-header">
        <button
          className="btn"
          type="button"
          onClick={() => {
            setShow((prev) => !prev);
          }}
        >
          <h3>{title}</h3>
          <img src={show ? up : down} alt="Déplier le menu" />
        </button>
      </div>
      {paragraph?.map((p, idx) => (
        <div key={`${idx}-${title}-${p.text}`} className="block-paragraph">
          {!p.isPublic && <img src={lock} alt="Visible que par moi" />}
          {p.text}
        </div>
      ))}
      {ressource?.map((p) => (
        <div key={`${title}-${p.name}-${p.url}`} className="block-paragraph">
          <a href={p.url} target="_blank" rel="noreferrer">
            {p.name}
          </a>
        </div>
      ))}
    </div>
  );
}

Block.defaultProps = defaultProps;

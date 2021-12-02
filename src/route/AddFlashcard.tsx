/* eslint-disable jsx-a11y/control-has-associated-label */
import './AddFlashcard.scss';
import { useState } from 'react';
import TagsOrganizer from '../component/TagsOrganizer';
import Ressource from '../component/Ressource';
/* import CreatableSelect from '../component/CreatableSelect'; */
import Block from '../component/Block';
import Flashcard from './Flashcard';

type PropsSubtitle = {
  title: string;
  order: number;
};

type PropsFlashcard = {
  subject: string;
  title: string;
  /*   subtitle?: PropsSubtitle[] | undefined; */
};
/* const defaultProps: Partial<PropsFlashcard> = {
  subtitle: [],
}; */

export default function AddFlashcard() {
  const [singleTag, setSingleTag] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const ressource: any[] = [];
  const [flashcard, setFlashcard] = useState({
    subject: '',
    title: '',
    tag: tags,
    ressource,
    subtitles: {
      subtitle: '',
      order: '',
    },
  });

  const submitForm = (event: any) => {
    event.preventDefault();
    const flashcardTitle = document.getElementById(
      'flashcard-title',
    ) as HTMLSelectElement;
    const flashcardValue = flashcardTitle?.value;
    console.log(flashcardValue);
    setFlashcard({
      ...flashcard,
      subject: flashcardTitle.dataset.id as string,
    });
  };

  const mockDataMatieres = {
    subject: [
      {
        subjectId: '1',
        imageUrl: '/images/Node.js_logo.svg',
        name: 'NodeJS',
      },
      {
        subjectId: '2',
        imageUrl: '/images/logo-react-blue-1.svg',
        name: 'React',
      },
      {
        subjectId: '3',
        imageUrl: '/images/GraphQL_Logo.svg',
        name: 'GraphQL',
      },
      {
        subjectId: '4',
        imageUrl: '/images/javascript-logo.svg',
        name: 'Javascript',
      },
      {
        subjectId: '5',
        imageUrl: '/images/Angular_full_color_logo.svg',
        name: 'Angular',
      },
      {
        subjectId: '6',
        imageUrl: '/images/PHP-logo.svg',
        name: 'PHP',
      },
      {
        subjectId: '7',
        imageUrl: '/images/HTML5_logo_and_wordmark.svg',
        name: 'HTML5',
      },
    ],
  };
  /*   const handleKeyDown = (event: any) => {
      if (event.key === 'Enter') {
        console.log(tags);
      }
    }; */

  // add tag callbacck
  //= ==================================================
  const addTag = () => {
    if (singleTag !== '') {
      setTags([...tags, singleTag]);
      setFlashcard({ ...flashcard, tag: [...tags, singleTag] });
      setSingleTag('');
    }
  };

  // remove tag callback
  //= ==================================================
  const removeTag = (text: string) => {
    const index = tags.indexOf(text);
    if (index > -1) {
      setTags(tags.filter((tag) => tag !== text));
      setFlashcard({
        ...flashcard,
        tag: flashcard.tag.filter((tag: string) => tag !== text),
      });
    }
  };

  // add ressource callbacck
  //= ==================================================
  const addRessource = () => {
    const inputName = document.getElementById(
      'ressource-name',
    ) as HTMLInputElement;
    const inputURL = document.getElementById(
      'ressource-url',
    ) as HTMLInputElement;
    const name = inputName?.value;
    const url = inputURL?.value;
    const flashcardCopy = { ...flashcard };
    flashcardCopy.ressource = [...flashcardCopy.ressource, { name, url }];
    setFlashcard(flashcardCopy);
    inputName.value = '';
    inputURL.value = '';
    /*  console.log(flashcard.ressource); */
  };

  return (
    <>
      <h1>Créer une fiche</h1>
      <div className="create-flashcard">
        <form className="formContainer">
          <select data-id="2" id="flashcard-title">
            <option key="default">Choisir une matière</option>
            {mockDataMatieres?.subject.map((element: any) => (
              <option
                data-id={element.subjectId}
                id={element.subjectId}
                key={element.subjectId}
              >
                {element.name}
              </option>
            ))}
          </select>

          <input
            type="texte"
            className="flashcardInput"
            name="title"
            placeholder="Ajouter un titre"
            value={flashcard.title}
            onChange={(e) =>
              setFlashcard({ ...flashcard, title: e.target.value })
            }
          />
          <div>
            <h3>Tags</h3>
          </div>
          <TagsOrganizer removeTagCallback={removeTag} tags={flashcard.tag} />
          <div>
            <input
              value={singleTag}
              onChange={(event) => setSingleTag(event.target.value)}
              type="text"
            />
            <button type="button" onClick={addTag}>
              Ajouter un tag
            </button>
          </div>
          <div>
            <h3>Ressources</h3>
            <div>
              {flashcard.ressource?.map((ress, i) => (
                <div key={i}>
                  <Ressource name={ress.name} url={ress.url} />
                </div>
              ))}
            </div>
            {/*       <Ressource ressources={flashcard.ressource} /> */}
            <input
              id="ressource-name"
              type="text"
              placeholder="Ajouter le titre de ressource"
            />
            <input
              id="ressource-url"
              type="text"
              placeholder="Ajouter l'url de ressource"
            />
            <button type="button" onClick={addRessource}>
              Ajouter une ressource
            </button>
          </div>
          {/*   <input
            type="texte"
            className="flashcardInput"
            placeholder="Ajouter un tag"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            onKeyUp={handleKeyDown}
          /> */}
          {/*  <p>{tags}</p> */}
          {/*           <Block title={soustitre} />
          <input
            type="textarea"
            className="flashcardInput"
            placeholder="Insérer un sous-titre"
            name="soustitre"
            value={soustitre}
            onChange={(e) => setSoustitre(e.target.value)}
          /> */}
          <div className="submit-cancel">
            <button
              type="submit"
              className="buttons btn-flashcard btn-submit"
              onClick={submitForm}
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

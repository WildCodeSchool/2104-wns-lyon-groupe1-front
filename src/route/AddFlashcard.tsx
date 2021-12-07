import './AddFlashcard.scss';
import { useState, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import TagsOrganizer from '../component/TagsOrganizer';
import Ressource from '../component/Ressource';
import BlockSubTitle from '../component/BlockSubTitle';
import { UserContext } from '../utils/UserContext';
import { CREATE_FLASHCARD } from '../utils/graphqlRequest';

export default function AddFlashcard() {
  const { user } = useContext(UserContext);
  const [singleTag, setSingleTag] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [position, setPosition] = useState(0);
  const ressource: any[] = [];
  const subtitle: any[] = [];
  const [flashcard, setFlashcard] = useState({
    subject: '',
    title: '',
    tag: tags,
    ressource,
    subtitle,
  });
  /* 
    const [createFlashcard] = useMutation(CREATE_FLASHCARD, {
      onCompleted: (value) => {
        handleClassroom(value.classroom);
      },
      onError: () => {
        // a changer, gerer les erreurs de retours créations classroom
        setPromotionNameError(true);
      },
    }); */

  const [createFlashcard] = useMutation(CREATE_FLASHCARD, {
    onCompleted: () => {
      window.alert('Created flashcard');
    },
    onError: () => {
      // a changer, gerer les erreurs de retours créations classroom
      window.alert('Error creating flashcard');
    },
  });

  const submitForm = (event: any) => {
    event.preventDefault();
    const flashcardTitle = document.getElementById(
      'flashcard-title',
    ) as HTMLSelectElement;

    setFlashcard({
      ...flashcard,
      subject: flashcardTitle.dataset.id as string,
    });
    createFlashcard({
      variables: {
        classroomId: user.classroom?.classroomId,
        subjectId: flashcard.subject,
        title: flashcard.title,
        ressource: flashcard.ressource,
        tag: flashcard.tag,
        subtitle: flashcard.subtitle,
      },
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

  // add sous-titre callbacck
  //= ==================================================
  const addTitle = () => {
    setPosition(position + 1);
    const sousTitreTitle = document.getElementById(
      'sous-titre',
    ) as HTMLInputElement;
    const title = sousTitreTitle?.value;
    const flashcardCopy = { ...flashcard };
    flashcardCopy.subtitle = [...flashcardCopy.subtitle, { title, position }];
    setFlashcard(flashcardCopy);
    sousTitreTitle.value = '';
    /*  console.log(flashcard.ressource); */
  };

  const positionChange = (sousTitrePosition: string, direction: string) => {
    const allSubtitles = flashcard.subtitle;
    const index = allSubtitles.findIndex(
      (positionIndex: any) => positionIndex.position === sousTitrePosition,
    );
    if (direction === 'downward') {
      const sliceSubtitle: any = allSubtitles.slice(index, index + 2);
      sliceSubtitle[0].position += 1;
      sliceSubtitle[1].position -= 1;
      allSubtitles.splice(sliceSubtitle[1].position, 1, sliceSubtitle[1]);
      allSubtitles.splice(sliceSubtitle[0].position, 1, sliceSubtitle[0]);
    }
    if (direction === 'upward') {
      const sliceSubtitle: any = allSubtitles.slice(index - 1, index + 1);
      sliceSubtitle[0].position += 1;
      sliceSubtitle[1].position -= 1;
      allSubtitles.splice(sliceSubtitle[1].position, 1, sliceSubtitle[1]);
      allSubtitles.splice(sliceSubtitle[0].position, 1, sliceSubtitle[0]);
    }
    const flashcardCopy = { ...flashcard };
    flashcardCopy.subtitle = allSubtitles;
    setFlashcard(flashcardCopy);
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
            <div className="addTag">
              <input
                className="flashcardInput"
                value={singleTag}
                onChange={(event) => setSingleTag(event.target.value)}
                type="text"
                placeholder="Ajouter un tag"
              />
              <button className="button" type="button" onClick={addTag}>
                Ajouter
              </button>
            </div>
            <TagsOrganizer removeTagCallback={removeTag} tags={flashcard.tag} />
          </div>
          <div className="ressources">
            <h3>Ressources</h3>
            <div className="allRessources">
              {flashcard.ressource?.map((ress, i) => (
                <Ressource key={i} name={ress.name} url={ress.url} />
              ))}
            </div>
          </div>
          <div className="ressources-input">
            <input
              id="ressource-name"
              className="flashcardInput-grey flashcardInput"
              type="text"
              placeholder="Ajouter le titre de ressource"
            />
            <input
              id="ressource-url"
              className="flashcardInput-grey flashcardInput"
              type="text"
              placeholder="Ajouter l'url de ressource"
            />
            <div className="validationButtons">
              <button
                className=" button removeButton"
                type="button"
                onClick={addRessource}
              >
                Annuler
              </button>
              <button
                className="addButton button"
                type="button"
                onClick={addRessource}
              >
                Ajouter
              </button>
            </div>
          </div>
          <div className="subtitle-list">
            {flashcard.subtitle?.map((sub, i) => (
              <div key={i} className="subtitle-detail">
                <BlockSubTitle
                  title={sub.title}
                  position={sub.position}
                  positionChangeCallback={positionChange}
                />
              </div>
            ))}
          </div>
          <input
            id="sous-titre"
            type="textarea"
            className="flashcardInput flashcardInput-grey"
            placeholder="Insérer un sous-titre"
            name="soustitre"
          />
          <div className="validationButtons">
            <button
              type="button"
              onClick={addTitle}
              className="removeButton button"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={addTitle}
              className="addButton button"
            >
              Ajouter
            </button>
          </div>
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

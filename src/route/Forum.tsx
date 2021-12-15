import { useCallback, useState, useEffect } from 'react';
import { debounce } from 'lodash';
import search from '../assets/search.svg';
import './forum.scss';
import PageTitle from '../component/PageTitle';
import forumIcon from '../assets/forumCellIcon.svg';
import closeIcon from '../assets/close.svg';
import formattedDate from '../utils/dateFormatted';

interface IForumResponse {
  title: string;
  flashcardId: string;
  question: any[];
  subjectId: string;
  date: Date;
}

interface IForumCellProps {
  title: string;
  flashcardId: string;
  question: any[];
  subjectId: string;
  date: Date;
}

const apiResponse: IForumResponse[] = [
  {
    subjectId: '1',
    flashcardId: '1',
    question: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    title: 'Introduction à GraphQL',
    date: new Date(),
  },
  {
    subjectId: '1',
    flashcardId: '2',
    question: ['a', 'a', 'a', 'a', 'a'],
    title: 'title2',
    date: new Date(),
  },
  {
    subjectId: '1',
    flashcardId: '3',
    question: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    title: 'Introduction à GraphQL Introduction',
    date: new Date(),
  },
  {
    subjectId: '1',
    flashcardId: '4',
    question: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    title: 'title4',
    date: new Date(),
  },
  {
    subjectId: '1',
    flashcardId: '5',
    question: ['a', 'a'],
    title: 'title5',
    date: new Date(),
  },
  {
    subjectId: '1',
    flashcardId: '6',
    question: ['a', 'a', 'a'],
    title: 'title6',
    date: new Date(),
  },
  {
    subjectId: '1',
    flashcardId: '7',
    question: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    title: 'title7',
    date: new Date(),
  },
];

export default function Forum() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchInputDelayed, setSearchInputDelayed] = useState<string>('');
  useState<IForumResponse[]>(apiResponse);
  const [searchResults, setSearchResults] =
    useState<IForumResponse[]>(apiResponse);
  const [tags, setTags] = useState<string[]>([]);

  // TAGS controller
  // ======================================================================
  const addTag = (tag: string) => {
    setTags([...tags, tag]);
  };

  const removeTag = (tag: string) => {
    const index = tags.indexOf(tag);
    if (index > -1) {
      setTags(tags.filter((singleTag: string) => singleTag !== tag));
    }
  };

  // debouncing search input
  // ======================================================================
  const filter = (text: string) => {
    setSearchInputDelayed(text);
    if (searchResults) {
      addTag(text);
      setSearchInput('');
    }
  };

  const debounceSearchInput = useCallback(
    debounce((text: string) => filter(text), 600),
    [],
  );

  const handleSearchInputChange = (text: string) => {
    setSearchInput(text);
    debounceSearchInput(text);
  };
  // ======================================================================

  const ForumCell = ({
    flashcardId,
    question,
    subjectId,
    title,
    date,
  }: IForumCellProps) => {
    const questionsNumber = question.length;
    const dateFormatted = formattedDate(date);

    return (
      <div className="forumCellContainer">
        <div className="forumCellTitleContainer">
          <div className="forumCellTitle">{title}</div>
          <img className="forumCellIcon" src={forumIcon} alt="forumIcon" />
        </div>
        <div className="forumCellDetailedinfoContianer">
          <span>{questionsNumber} Questions</span>
          <span>{dateFormatted}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="forumSearchPageContainer">
      <PageTitle textColor="#0998C0" title="Forums" />
      <div className="forumSearchInputContainer">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => handleSearchInputChange(e.target.value)}
        />
        <img src={search} alt="chercher un tag" />
      </div>

      {searchInputDelayed.length === 0 ? (
        <div className="forumGreetings">
          Taper les mots clefs qui correspondent à vos recherches
        </div>
      ) : (
        <div>
          {tags.map((singleTag: string, index: number) => {
            return (
              <div className="singleTagContainer" key={index}>
                <div className="singleTag">
                  <div className="tagText">{singleTag}</div>
                  <button
                    className="tagCloseButton"
                    type="button"
                    onClick={() => removeTag(singleTag)}
                  >
                    <img src={closeIcon} alt="close icon" />
                  </button>
                </div>
              </div>
            );
          })}
          <div>
            {searchResults && searchResults.length === 0 ? (
              <div className="forumGreetings">
                Aucun resultat n&apos;a été trouvé
              </div>
            ) : (
              searchResults &&
              searchResults.map(
                (singleForum: IForumResponse, index: number) => {
                  return (
                    <ForumCell
                      key={index}
                      title={singleForum.title}
                      date={singleForum.date}
                      flashcardId={singleForum.flashcardId}
                      subjectId={singleForum.subjectId}
                      question={singleForum.question}
                    />
                  );
                },
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

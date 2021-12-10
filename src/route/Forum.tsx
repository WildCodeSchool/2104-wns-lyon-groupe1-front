import { useCallback, useState } from 'react';
import { conformsTo, debounce, remove } from 'lodash';
import search from '../assets/search.svg';
import './forum.scss';
import PageTitle from '../component/PageTitle';
import forumIcon from '../assets/forumIcon.svg';
import { IFlashcard, IQuestion } from '../utils/interface';
import closeIcon from '../assets/close.svg';

interface IForumResponse {
  title: string;
  tag: string[];
  flashcardId: string;
  question: any;
}

const mockAllForums: IForumResponse[] = [
  {
    flashcardId: '1',
    question: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    tag: ['javascript', 'react'],
    title: 'title1',
  },
  {
    flashcardId: '2',
    question: ['a', 'a', 'a', 'a', 'a'],
    tag: ['javascript', 'react'],
    title: 'title2',
  },
  {
    flashcardId: '3',
    question: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    tag: ['devops', 'typescript'],
    title: 'title3',
  },
  {
    flashcardId: '4',
    question: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    tag: ['javascript', 'devops'],
    title: 'title4',
  },
  {
    flashcardId: '5',
    question: ['a', 'a'],
    tag: ['python', 'react'],
    title: 'title5',
  },
  {
    flashcardId: '6',
    question: ['a', 'a', 'a'],
    tag: ['javascript', 'django'],
    title: 'title6',
  },
  {
    flashcardId: '7',
    question: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
    tag: ['flask', 'python'],
    title: 'title7',
  },
];

export default function Forum() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchInputDelayed, setSearchInputDelayed] = useState<string>('');
  const [hiddenFoundInput, setHiddenFoundInput] = useState<string[]>();
  const [forumsResponse, setForumsResponse] =
    useState<IForumResponse[]>(mockAllForums);
  const [searchResults, setSearchResults] = useState<IForumResponse[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  // const [filteredResults, setFilteredResults] = useState<IForumResponse[]>([]);

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
    const filteredResults = [];
    setSearchInputDelayed(text);
    for (let i = 0; i < forumsResponse.length; i += 1) {
      for (let j = 0; j < forumsResponse[i].tag.length; j += 1) {
        if (forumsResponse[i].tag[j] === text) {
          filteredResults.push(forumsResponse[i]);
          addTag(text);
        }
      }
    }
    setSearchResults(filteredResults);
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
  return (
    <div>
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
              <div key={index}>
                <div>{singleTag}</div>
                <button type="button" onClick={() => removeTag(singleTag)}>
                  <img src={closeIcon} alt="close icon" />
                </button>
              </div>
            );
          })}
          <div>
            {searchResults && searchResults.length === 0
              ? 'no results'
              : searchResults &&
                searchResults.map((singleForum) => {
                  return <div>{singleForum.title}</div>;
                })}
          </div>
        </div>
      )}
    </div>
  );
}

import { useCallback, useContext, useState } from 'react';
import { debounce } from 'lodash';
import { useHistory } from 'react-router-dom';
import './forums.scss';
import slugify from 'react-slugify';
import { useQuery } from '@apollo/client';
import PageTitle from '../component/PageTitle';
import formattedDate from '../utils/dateFormatted';
import forumIcon from '../assets/forumCellIcon.svg';
import closeIcon from '../assets/close.svg';
import search from '../assets/search.svg';
import { UserContext } from '../utils/UserContext';
import { SEARCH_FORUMS } from '../utils/graphqlRequest';

interface IForumResponse {
  title: string;
  id: string;
  question: any[];
  subjectId: string;
  date: Date;
}

interface IForumCellProps {
  title: string;
  id: string;
  question: any[];
  subjectId: string;
  date: Date;
}

export default function Forums() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchInputDelayed, setSearchInputDelayed] = useState<string>('');
  const [tagsToSearch, setTagsToSearch] = useState<string[]>([]);
  const [uiTags, setUiTags] = useState<string[]>(['graphQl']);
  const history = useHistory();
  const { user } = useContext(UserContext);

  const { loading, data } = useQuery<
    { getAllFlashcards: IForumResponse[] },
    { uiTags: string[]; classroomId: string }
  >(SEARCH_FORUMS, {
    variables: {
      uiTags,
      classroomId: user.classroom?.classroomId || '',
    },
    onError: (error) => {
      window.alert('Could not get anything');
    },
  });

  // TAGS controller
  // ======================================================================
  const addUiTag = (uiTag: string) => {
    setUiTags([...uiTags, uiTag]);
  };

  const removeTag = (uiTag: string) => {
    const index = uiTags.indexOf(uiTag);
    if (index > -1) {
      setUiTags(uiTags.filter((singleTag: string) => singleTag !== uiTag));
    }
  };

  // debouncing search input
  // ======================================================================
  const filter = (text: string) => {
    setSearchInputDelayed(text);
    if (data?.getAllFlashcards) {
      addUiTag(text);
      setSearchInput('');
    }
  };

  const debounceSearchInput = useCallback(
    debounce((text: string) => filter(text), 600),
    [uiTags],
  );

  const handleSearchInputChange = (text: string) => {
    setSearchInput(text);
    debounceSearchInput(text);
  };
  // ======================================================================

  const ForumCell = ({
    id,
    question,
    subjectId,
    title,
    date,
  }: IForumCellProps) => {
    const questionsNumber = question.length;
    const dateFormatted = formattedDate(date);

    const goToForum = () => {
      history.push({
        pathname: `/forum/${slugify(title)}`,
        state: {
          flashcardId: id,
          subjectId,
        },
      });
    };

    return (
      <button
        className="forumCellContainer"
        type="button"
        onClick={() => goToForum()}
      >
        <div className="forumCellTitleContainer">
          <div className="forumCellTitle">{title}</div>
          <img className="forumCellIcon" src={forumIcon} alt="forumIcon" />
        </div>
        <div className="forumCellDetailedinfoContianer">
          <span>{questionsNumber} Questions</span>
          <span>{dateFormatted}</span>
        </div>
      </button>
    );
  };
  // ======================================================================

  // if (loading || !data) return <p>Loading...</p>;

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
          {uiTags.map((singleTag: string, index: number) => {
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
            {data?.getAllFlashcards && data.getAllFlashcards.length === 0 ? (
              <div className="forumGreetings">
                Aucun resultat n&apos;a été trouvé
              </div>
            ) : (
              data?.getAllFlashcards &&
              data.getAllFlashcards.map(
                (singleForum: IForumResponse, index: number) => {
                  return (
                    <ForumCell
                      key={index}
                      title={singleForum.title}
                      date={singleForum.date}
                      id={singleForum.id}
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

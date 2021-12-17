import { FormEvent, useState } from 'react';

import './forumEditorBlock.scss';

interface IEditorBlockProps {
  placeHolderText: string;
  onSubmitCallback: CallableFunction;
  questionId?: string | undefined; // if there is a question id then we are posting an answer
}

const defaultProps: Partial<IEditorBlockProps> = {
  questionId: undefined,
};

export default function ForumEditorBlock({
  placeHolderText,
  onSubmitCallback,
  questionId,
}: IEditorBlockProps) {
  const [inputText, setInputText] = useState<string>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (questionId) {
      onSubmitCallback(inputText, questionId);
    } else {
      onSubmitCallback(inputText);
    }
    setInputText('');
  };

  return (
    <form className="editorContainer" onSubmit={handleSubmit}>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={placeHolderText}
        required
      />
      <div className="forumEditorButtonsContainer">
        <button type="button" onClick={() => setInputText('')}>
          Annuler
        </button>
        <input type="submit" value="Soumettre" />
      </div>
    </form>
  );
}

ForumEditorBlock.defaultProps = defaultProps;

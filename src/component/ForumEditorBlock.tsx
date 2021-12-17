import { useState } from 'react';

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

  return (
    <form
      className="editorContainer"
      onSubmit={
        questionId
          ? (event) => onSubmitCallback(event, questionId, inputText)
          : (event) => onSubmitCallback(event)
      }
    >
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={placeHolderText}
        // required
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

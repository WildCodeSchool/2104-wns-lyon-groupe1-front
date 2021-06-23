import { useState } from 'react';
import './addPromotion.scss';

export default function addPromotion() {
  const [promotionName, setPromotionName] = useState('');
  const [beginningYear, setBeginningYear] = useState('');
  const [finishingYear, setFinishingYear] = useState('');
  const [promotionNameError, setPromotionNameError] = useState(false);

  const verifyTextOnly = (thePromotionName: string): boolean => {
    const regex = /^[a-zA-Z\s\-\\/ ]*$/;

    if (regex.test(thePromotionName) && thePromotionName !== '') {
      return true;
    }
    return false;
  };

  const buildOptions = () => {
    const arr = [];
    const actualYear = new Date().getFullYear();
    const maxYear = actualYear + 20;

    for (let i = actualYear; i <= maxYear; i += 1) {
      arr.push(
        <option key={i} value={i}>
          {i}
        </option>,
      );
    }

    return arr;
  };

  const submitForm = (event: any) => {
    event.preventDefault();

    const promotionNameIsVerified = verifyTextOnly(promotionName);
    if (promotionNameIsVerified === true) {
      setPromotionNameError(false);
      console.log({ promotionName, beginningYear, finishingYear });
    } else {
      setPromotionNameError(true);
    }

    // TODO delete console log
  };

  return (
    <div className="add-promotion">
      <h1>Ajouter une promotion</h1>
      <form className="form-add-promotion" onSubmit={submitForm}>
        <input
          type="text"
          className="overlayInput promotion-name"
          placeholder="Nom de la promotion"
          value={promotionName}
          onChange={(e) => setPromotionName(e.target.value)}
        />
        <span className="form-error">
          {promotionNameError ? "Ce champ n'est pas valide" : ''}
        </span>
        <div className="promotion-year">
          <select
            className="overlayInput promotion-beginning-year"
            onChange={(e) => setBeginningYear(e.target.value)}
          >
            <option value="">Début de formation</option>
            {buildOptions()}
          </select>
          <select
            className="overlayInput promotion-finishing-year"
            onChange={(e) => setFinishingYear(e.target.value)}
          >
            <option value="">Fin de formation</option>
            {buildOptions()}
          </select>
        </div>
        <input className="overlaySubmitButton" type="submit" value="Ajouter" />
      </form>
    </div>
  );
}

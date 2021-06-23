import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import Overlay from '../component/OverLay';
import './professorAccount.scss';

export default function ProfessorAccount() {
  const userData = useContext(UserContext);

  const [isOpenOverlay, setIsOpenOverlay] = useState(false);
  const [password, handlePasswordChange] = useState('');
  const [confirmedPassword, handleConfirmedPasswordChange] = useState('');

  // change isOpenOverlay state
  const passwordModifierOverlay = () => {
    if (isOpenOverlay === true) {
      setIsOpenOverlay(false);
    }
    if (isOpenOverlay === false) {
      setIsOpenOverlay(true);
    }
  };

  const resetFormInputs = () => {
    handlePasswordChange('');
    handleConfirmedPasswordChange('');
  };

  const submitForm = (event: any) => {
    // close the overlay
    setIsOpenOverlay(false);
    event.preventDefault();
    resetFormInputs();
    // TODO delete console log
    console.log({ password, confirmedPassword });
  };

  const getIsOpenCallback = (data: any) => {
    setIsOpenOverlay(data);
    resetFormInputs();
  };

  return (
    <main>
      <Overlay isOpen={isOpenOverlay} getIsOpen={getIsOpenCallback}>
        <div className="overlayElements">
          <h3 className="title">Modifier mon mot de passe</h3>
          <form className="formContainer" onSubmit={submitForm}>
            <input
              type="password"
              className="overlayInput"
              placeholder="Modifier mon mot de passe"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            <input
              type="password"
              className="overlayInput"
              placeholder="Confirmer mon mot de passe"
              value={confirmedPassword}
              onChange={(e) => handleConfirmedPasswordChange(e.target.value)}
            />
            <input
              className="overlaySubmitButton"
              type="submit"
              value="Valider"
            />
          </form>
        </div>
      </Overlay>
      <h2 className="title greetings">Mon Espace</h2>
      <div className="greetings">Bienvenue {userData.firstname} !</div>
      <div className="greetings">{userData.classroom?.name}</div>

      <div className="readOnlyButton">{userData.email}</div>

      <div
        role="button"
        tabIndex={0}
        onClick={passwordModifierOverlay}
        onKeyDown={passwordModifierOverlay}
        className="buttons"
      >
        Modifier mon mot de passe
      </div>
      <div className="buttons">
        <Link to="/ma-promotion">Ma promotion</Link>
      </div>
    </main>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Overlay from '../overLay/OverLay';
import styles from './professorAccount.module.scss';

// Dummy data
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
export default function ProfessorAccount() {
  const userData = {
    firstname: 'Nicolas',
    lastname: 'Le Grand',
    email: 'nicolas.legrand@aze.com',
    classroom: {
      name: 'Wild Code School',
    },
  };
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

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
        <div className={styles.overlayElements}>
          <h3 className={styles.title}>Modifier mon mot de passe</h3>
          <form className={styles.formContainer} onSubmit={submitForm}>
            <input
              type="password"
              className={styles.overlayInput}
              placeholder="Modifier mon mot de passe"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            <input
              type="password"
              className={styles.overlayInput}
              placeholder="Confirmer mon mot de passe"
              value={confirmedPassword}
              onChange={(e) => handleConfirmedPasswordChange(e.target.value)}
            />
            <input
              className={styles.overlaySubmitButton}
              type="submit"
              value="Valider"
            />
          </form>
        </div>
      </Overlay>
      <h2 className={`${styles.title} ${styles.greetings}`}>Mon Espace</h2>
      <div className={styles.greetings}>Bienvenue {userData.firstname} !</div>
      <div className={styles.greetings}>{userData.classroom.name}</div>

      <div className={styles.readOnlyButton}>{userData.email}</div>

      <div
        role="button"
        tabIndex={0}
        onClick={passwordModifierOverlay}
        onKeyDown={passwordModifierOverlay}
        className={styles.buttons}
      >
        Modifier mon mot de passe
      </div>
      <div className={styles.buttons}>
        <Link to="professor/promotion">Mes promotions</Link>
      </div>
    </main>
  );
}

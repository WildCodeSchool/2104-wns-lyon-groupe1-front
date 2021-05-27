import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Overlay from '../overLay/OverLay';
import PageTitle from '../pageTitle/PageTitle';
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
  // get the reference of form
  const resetPasswordFormRef = useRef<HTMLFormElement>(null);

  // change isOpenOverlay state
  const passwordModifierOverlay = () => {
    if (isOpenOverlay === true) {
      setIsOpenOverlay(false);
    }
    if (isOpenOverlay === false) {
      setIsOpenOverlay(true);
    }
  };

  const submitForm = (event: any) => {
    // close the overlay
    setIsOpenOverlay(false);
    event.preventDefault();
    const form = resetPasswordFormRef.current;
    // if form is not null then reset it
    if (form !== null) {
      form.reset();
    }
    console.log({ password, confirmedPassword });
  };

  return (
    <main>
      <Overlay isOpen={isOpenOverlay}>
        <div className={styles.overlayElements}>
          <h3 className={styles.title}>Modifier mon mot de passe</h3>
          <form
            ref={resetPasswordFormRef}
            className={styles.formContainer}
            onSubmit={submitForm}
          >
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
      <div className={`${styles.title} ${styles.greetings}`}>
        <PageTitle content="Mon Espace" textColor="#8FC89A" />
      </div>
      <div className={styles.greetings}>Bienvenue {userData.firstname} !</div>
      <div className={styles.greetings}>{userData.classroom.name}</div>

      <div className={`${styles.buttons} ${styles.readOnly}`}>
        {userData.email}
      </div>

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

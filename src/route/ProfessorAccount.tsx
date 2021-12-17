import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UserContext } from '../utils/UserContext';
import Overlay from '../component/OverLay';
import './professorAccount.scss';
import { CHANGE_PASSWORD_STUDENT } from '../utils/graphqlRequest';

export default function ProfessorAccount() {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);
  const [password, handlePasswordChange] = useState('');
  const [oldPassword, handleOldPasswordChange] = useState('');
  const [confirmedPassword, handleConfirmedPasswordChange] = useState('');
  const [passwordErrored, setPasswordErrored] = useState(false);
  const [changePassword] = useMutation(CHANGE_PASSWORD_STUDENT, {
    onCompleted: (data) => {
      if (data.changePassword) {
        history.push('/me-deconnecter');
      }
    },
  });

  // change isOpenOverlay state
  const passwordModifierOverlay = () => {
    if (isOpenOverlay === true) {
      setIsOpenOverlay(false);
    }
    if (isOpenOverlay === false) {
      setIsOpenOverlay(true);
      // set to false again when it is closed, because even when user does not want to change password any more no error will be shown
      setPasswordErrored(false);
    }
  };

  const resetFormInputs = () => {
    handleOldPasswordChange('');
    handlePasswordChange('');
    handleConfirmedPasswordChange('');
  };

  // get both passwords, compare them, if they are identical and not null return true, otherwise return false
  const verifyPassword = (
    passwordText: string,
    repeatedPasswordText: string,
  ): boolean => {
    // create a new regex
    const regex = new RegExp(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    );
    // if regex is tester true and passwords are identical
    if (regex.test(passwordText) && passwordText === repeatedPasswordText) {
      return true;
    }
    return false;
  };

  const submitForm = (event: any) => {
    setPasswordErrored(true);
    // close the overlay
    const isVerified = verifyPassword(password, confirmedPassword);
    if (isVerified) {
      changePassword({ variables: { oldPassword, newPassword: password } });
      setIsOpenOverlay(false);
      resetFormInputs();
    }
    event.preventDefault();
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
          <span className="passwordError">
            {passwordErrored ? 'Les mots de passe ne sont pas identiques' : ''}
          </span>
          <p>
            1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial requis{' '}
          </p>
          <form className="formContainer" onSubmit={submitForm}>
            <input
              type="password"
              className="overlayInput"
              placeholder="Ancien mot de passe"
              value={oldPassword}
              onChange={(e) => handleOldPasswordChange(e.target.value)}
            />
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
      <div className="greetings">Bienvenue {user.firstname} !</div>
      <div className="greetings">{user.classroom?.name}</div>

      <div className="readOnlyButton">{user.mail}</div>

      <div
        role="button"
        tabIndex={0}
        onClick={passwordModifierOverlay}
        onKeyDown={passwordModifierOverlay}
        className="buttons"
      >
        Modifier mon mot de passe
      </div>
      {user.isTeacher && (
        <div className="buttons">
          <Link to="/ma-promotion">Ma promotion</Link>
        </div>
      )}
    </main>
  );
}

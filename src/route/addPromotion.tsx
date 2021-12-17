import { useState } from 'react';
import { useMutation } from '@apollo/client';
import CSVReader from 'react-csv-reader';
import { CREATE_CLASSROOM } from '../utils/graphqlRequest';
import './addPromotion.scss';
import ErrorModal from '../component/ErrorModal';

type AddPromotionProps = {
  handleClassroom: Function;
};

interface iInputError {
  errorText: string;
}

export default function AddPromotion({ handleClassroom }: AddPromotionProps) {
  const [promotionName, setPromotionName] = useState<string>('');
  const [beginningYear, setBeginningYear] = useState<string>('');
  const [finishingYear, setFinishingYear] = useState<string>('');
  const [promotionNameError, setPromotionNameError] = useState(false);
  const [beginningYearError, setBeginningYearError] = useState(false);
  const [finishingYearError, setFinishingYearError] = useState(false);
  const [emailAdressesRequiredError, setEmailAdressesRequiredError] =
    useState(false);
  const [emailAdressesError, setEmailAdressesError] = useState<Array<number>>(
    [],
  );

  const [scholarYearOrderError, setScholarYearOrderError] =
    useState<boolean>(false);
  const [emailAdresses, setEmailAdresses] = useState<Array<string>>([]);

  const [studentsNumberInput, setStudentsNumberInput] = useState<number>(0); // state used for the controller input
  const [studentsNumber, setStudentsNumber] = useState<number>(0);

  // state used to swap between manually entering students emails or automatically via a csv
  const [manualStudentsEntry, setManualStudentsEntry] =
    useState<boolean>(false);

  const [isVisibleErrorModal, setIsVisibleErrorModal] = useState(false);
  // ======================================

  const [createClassroom] = useMutation(CREATE_CLASSROOM, {
    onCompleted: (value) => {
      const newClassroom = {
        classroomId: value.addClassroom.id,
        name: value.addClassroom.name,
        year: value.addClassroom.year,
      };

      handleClassroom(newClassroom);
    },
    onError: () => {
      setIsVisibleErrorModal(true);
    },
  });

  // Je vérifie le nom de la promo
  // =========================================================
  const verifyTextAndNumbersOnly = (thePromotionName: string): boolean => {
    const regex = /^[a-zA-ZÀ-ÿ0-9\s\-\\/ ]*$/;

    if (regex.test(thePromotionName) && thePromotionName !== '') {
      return true;
    }
    return false;
  };

  // Je vérifie Les adresses mails des étudiants
  // =========================================================
  const verifyEmail = (studentEmailAdress: string): boolean => {
    const regex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (regex.test(studentEmailAdress) && studentEmailAdress !== '') {
      return true;
    }
    return false;
  };

  // Je vérifie qu'il y ait une date d'année scolaire
  // =========================================================
  const verifyScholarYearInput = (myBeginningYear: string): boolean => {
    const regex = /^(20)\d{2}$/;
    if (regex.test(myBeginningYear) && myBeginningYear !== '') {
      return true;
    }
    return false;
  };

  // Je crée les dates de mes années scolaire en partant de l'année actuelle + 20 ans
  // =========================================================
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

  // Lorsque je soumets mon formulaire, je vérifie mes champs un par un
  // =========================================================
  const submitForm = (event: any) => {
    setPromotionNameError(false);
    setBeginningYearError(false);
    setFinishingYearError(false);
    setEmailAdressesRequiredError(false);
    setEmailAdressesError([]);
    event.preventDefault();
    let error = false;

    // Enlève les doublons, et les mails vide
    const emailToSend = Array.from(
      new Set(emailAdresses.filter((email) => email.length)),
    );

    if (!verifyTextAndNumbersOnly(promotionName)) {
      setPromotionNameError(true);
      error = true;
    }

    if (!verifyScholarYearInput(beginningYear)) {
      setBeginningYearError(true);
      error = true;
    }

    if (!verifyScholarYearInput(finishingYear)) {
      setFinishingYearError(true);
      error = true;
    }

    if (Number(beginningYear) > Number(finishingYear)) {
      setScholarYearOrderError(true);
      error = true;
    }

    if (emailToSend.length === 0) {
      setEmailAdressesRequiredError(true);
      error = true;
    }

    if (emailToSend.length > 0) {
      const errorEmail: number[] | null = [];
      emailToSend.forEach((element) => {
        if (!verifyEmail(element)) {
          errorEmail.push(emailAdresses.findIndex((mail) => mail === element));
          error = true;
        }
      });
      setEmailAdressesError(errorEmail);
    }

    if (error === false) {
      createClassroom({
        variables: {
          name: promotionName,
          year: `${beginningYear}/${finishingYear}`,
          mails: emailToSend,
        },
      });
    }
    error = false;
  };

  // =========================================================
  const handleCsv = (data: any) => {
    setManualStudentsEntry(false);
    setEmailAdresses(data.map((element: string[]) => element[0]));
  };

  // =========================================================
  const handleChange = (e: any, index: number) => {
    const email: string[] = [...emailAdresses];
    email[index] = e.target.value;
    setEmailAdresses(email);
  };
  // =========================================================

  const InputError = ({ errorText }: iInputError) => {
    return <span className="form-error">{errorText}</span>;
  };

  // =========================================================

  const confirmWantedStudentsNumber = () => {
    setManualStudentsEntry(true); // set manual mode to true
    setEmailAdresses([]); // reset all email adresses when starting manual mode
    setStudentsNumber(studentsNumberInput);
  };
  return (
    <div className="add-promotion">
      <ErrorModal
        buttonText="ok"
        isVisible={isVisibleErrorModal}
        text={"Une erreur s'est produite, veuillez réessayer plus tard"}
        onConfirmCallback={() => setIsVisibleErrorModal(false)}
      />
      <h1>Ajouter une promotion</h1>
      <form className="form-add-promotion" onSubmit={submitForm}>
        {promotionNameError && (
          <InputError errorText={"Ce champ n'est pas valide"} />
        )}
        <input
          type="text"
          className="overlayInput promotion-name text-align-left"
          placeholder="Nom de la promotion"
          value={promotionName}
          onChange={(e) => setPromotionName(e.target.value)}
        />
        <div className="promotion-year">
          {beginningYearError && (
            <InputError errorText={"Ce champ n'est pas valide"} />
          )}
          {scholarYearOrderError && (
            <InputError
              errorText={"L'année de début est supérieure à l'année de fin"}
            />
          )}
          <select
            title="Année de début"
            className="overlayInput promotion-beginning-year"
            onChange={(e) => setBeginningYear(e.target.value)}
          >
            <option value="">Début de formation</option>
            {buildOptions()}
          </select>
          {finishingYearError && (
            <InputError errorText={"Ce champ n'est pas valide"} />
          )}
          {beginningYearError && (
            <InputError errorText={"Ce champ n'est pas valide"} />
          )}
          <select
            title="Fin de formation"
            className="overlayInput promotion-finishing-year"
            onChange={(e) => setFinishingYear(e.target.value)}
          >
            <option value="">Fin de formation</option>
            {buildOptions()}
          </select>
        </div>
        {emailAdressesRequiredError && (
          <InputError errorText="Au moins un mail est demandé" />
        )}
        <CSVReader
          onFileLoaded={(data) => handleCsv(data)}
          inputId="csv-reader"
          inputName="csvReader"
          cssClass="csv-reader-input"
          label="Importer un fichier csv"
        />
        <div className="student-emails">
          {!manualStudentsEntry &&
            emailAdresses.map((element: string, index: number) => (
              <div key={index}>
                {emailAdressesError.includes(index) && (
                  <span key={`${element}-${element}`}>
                    <InputError errorText="Ce mail n'est pas valide" />
                  </span>
                )}
                <input
                  key={`input-mail-${index}`}
                  type="text"
                  className="overlayInput promotion-name"
                  placeholder="Mail étudiant"
                  value={element}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            ))}
        </div>
        Ou
        <div className="studentsNumberWrapper">
          <div>Nombre d&apos;étudiants</div>
          <div className="studentsNumberContainer">
            <input
              type="number"
              title="number of input to show"
              value={studentsNumberInput}
              onChange={(e) => setStudentsNumberInput(Number(e.target.value))}
              min="0"
              max="100"
              className="studentsNumberInput"
            />
            <button type="button" onClick={confirmWantedStudentsNumber}>
              OK
            </button>
          </div>
        </div>
        <div className="student-emails">
          {manualStudentsEntry &&
            [...Array(studentsNumber)].map((element, index: number) => {
              return (
                <div key={index}>
                  {emailAdressesError.includes(index) && (
                    <span key={`${element}-${element}`}>
                      <InputError errorText="Ce mail n'est pas valide" />
                    </span>
                  )}
                  <input
                    key={index}
                    id="student-email"
                    type="text"
                    className="overlayInput promotion-name"
                    placeholder="Mail étudiant"
                    value={element}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              );
            })}
        </div>
        <input className="overlaySubmitButton" type="submit" value="Ajouter" />
      </form>
    </div>
  );
}

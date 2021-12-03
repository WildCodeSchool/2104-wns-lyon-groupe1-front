import { useState } from 'react';
import { useMutation } from '@apollo/client';
import CSVReader from 'react-csv-reader';
import { CREATE_CLASSROOM } from '../utils/graphqlRequest';
import './addPromotion.scss';

type AddPromotionProps = {
  handleClassroom: Function;
};

interface iInputError {
  errorText: string;
}

export default function AddPromotion({ handleClassroom }: AddPromotionProps) {
  const [promotionName, setPromotionName] = useState<string>('');
  const [beginningYear, setBeginningYear] = useState<string>('');
  const [finishingYear, setFinishingYear] = useState<string>('2022');
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

  const [createClassroom] = useMutation(CREATE_CLASSROOM, {
    onCompleted: (value) => {
      handleClassroom(value.classroom);
    },
    onError: (error) => {
      window.alert('Handle error properly');
    },
  });
  const [emailAdresses, setEmailAdresses] = useState<Array<string>>([]);

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

  // show error if beginngin year is bigger than finishing year
  // =========================================================
  const verifyScholarYearsOrders = (
    beginningYearValue: string,
    finishingYearValue: string,
  ): void => {
    if (Number(beginningYearValue) >= Number(finishingYearValue)) {
      setScholarYearOrderError(true);
    }
    setScholarYearOrderError(false);
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
    // verifyScholarYearsOrders(beginningYear, finishingYear);
    setEmailAdressesError([]);
    event.preventDefault();
    let error = false;
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

    if (emailAdresses.length === 0) {
      setEmailAdressesRequiredError(true);
      error = true;
    }

    if (emailAdresses.length > 0) {
      const errorEmail: number[] | null = [];
      emailAdresses.forEach((element, index) => {
        if (!verifyEmail(element)) {
          errorEmail.push(index);
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
          mails: emailAdresses,
        },
      });
    }
    error = false;
  };

  // =========================================================
  const handleCsv = (data: any) => {
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

  return (
    <div className="add-promotion">
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
          {emailAdresses.map((element: string, index: number) => (
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
          ))}
        </div>

        <input className="overlaySubmitButton" type="submit" value="Ajouter" />
      </form>
    </div>
  );
}

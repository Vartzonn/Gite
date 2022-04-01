import React, { useEffect, useState } from "react";
import "./Reservation.css";

import { v4 as uuidv4 } from "uuid";

import { a, useTrail } from "react-spring";

import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
import { subDays, addDays, eachDayOfInterval } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("fr", fr);

export default function Reservation() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  // Liste des dates occupées
  const [occupiedDates, setOccupiedDates] = useState([
    ["2022-02-01", "2022-02-05"],
    ["2022-02-17", "2022-02-20"],
    ["2022-02-28", "2022-03-03"],
    ["2022-03-05", "2022-03-12"],
    ["2022-04-07", "2022-04-09"],
    ["2022-05-12", "2022-05-21"],
  ]);

  // States pour les intervalles de dates de réservation
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // States et variables pour les prix
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalWeekendDays, setTotalWeekendDays] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const weekDayPrice = 40;
  const weekendDayPricesArr = [70, 120];
  const basicWeekendDayPrice = weekendDayPricesArr[0];

  // State pour quand l'utilisateur select des dates invalides
  let [hasSelectInvalidDays, setHasSelectInvalidDays] = useState({
    invalid: false,
    reason: null,
  });

  const handleChange = (dates) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);

    setHasSelectInvalidDays({
      invalid: false,
      reason: null,
    });
    // Calcul du prix total
    setTotalPrice(0);
    setTotalWeekendDays(0);
    setNumberOfDays(0);

    // Si l'utilisateur a select un intervalle de dates
    if (end) {
      const startDate = new Date(start);
      const endDate = new Date(end);

      let totalDays;
      // On prend tous les jours dans l'intervalle
      totalDays = eachDayOfInterval({
        start: start,
        end: end,
      });

      // On vérifie si la date sélectionnée n'est pas antérieure à aujourd'hui
      let invalid = false;
      let oldDayMsg =
        "Vous avez sélectionné une date antérieure à aujourd'hui !";
      if (start.getFullYear() < new Date().getFullYear()) {
        setHasSelectInvalidDays({
          invalid: true,
          reason: oldDayMsg,
        });
        invalid = true;
      } else if (start.getFullYear() === new Date().getFullYear()) {
        if (start.getMonth() <= new Date().getMonth()) {
          if (start.getDate() < new Date().getDate()) {
            setHasSelectInvalidDays({
              invalid: true,
              reason: oldDayMsg,
            });
            invalid = true;
          }
        }
      }
      if (invalid) {
        return;
      }

      // On vérifie si il n'y a pas un jour exclu dans l'intervalle
      let excludedDaysArr = [];
      for (let i = 0; i < excludeDatesArray.length; i++) {
        for (let j = 0; j < totalDays.length; j++) {
          if (excludeDatesArray[i].getDate() === totalDays[j].getDate()) {
            if (excludeDatesArray[i].getMonth() === totalDays[j].getMonth()) {
              if (
                excludeDatesArray[i].getFullYear() ===
                totalDays[j].getFullYear()
              ) {
                excludedDaysArr.push(totalDays[j]);
                setHasSelectInvalidDays({
                  invalid: true,
                  reason: "Vous avez sélectionné un jour déjà réservé !",
                });
              }
            }
          }
        }
      }

      if (excludedDaysArr.length > 0) {
        return;
      }

      // On crée une autre variable qui compte les jours du weekend car le state n'est pas mis à jour dans la fonction
      let weekendDays = 0;

      setNumberOfDays(totalDays.length);

      // On parcourt les jours pour déterminer le prix
      let price = 0;
      totalDays.forEach((day) => {
        if (day.getDay() === 6 || day.getDay() === 5) {
          setTotalWeekendDays((state) => (state += 1));
          weekendDays += 1;
        } else {
          price += weekDayPrice;
        }
      });

      // On actualise le state
      if (weekendDays === 0) {
        setTotalPrice((state) => (state += price));
      } else if (weekendDays > 0 && weekendDays <= weekendDayPricesArr.length) {
        setTotalPrice(
          (state) => (state += price + weekendDayPricesArr[weekendDays - 1])
        );
      } else if (weekendDays > weekendDayPricesArr.length) {
        setTotalPrice(
          (state) => (state += price + basicWeekendDayPrice * weekendDays)
        );
      }
    }
  };

  // States qui servent à ouvrir les calendriers à des mois différents
  const [actualDate, setActualDate] = useState(new Date());
  const [dateOneMonth, setDateOneMonth] = useState(
    new Date(addDays(new Date(), 30))
  );
  const [dateTwoMonth, setDateTwoMonth] = useState(
    new Date(addDays(new Date(), 60))
  );
  const [dateThreeMonth, setDateThreeMonth] = useState(
    new Date(addDays(new Date(), 90))
  );

  // Pour l'animation à l'apparition
  const startingDatesArr = [actualDate];
  innerWidth > 800 && startingDatesArr.push(dateOneMonth);
  innerWidth > 1116 && startingDatesArr.push(dateTwoMonth);
  innerWidth > 1116 && startingDatesArr.push(dateThreeMonth);
  const trail = useTrail(startingDatesArr.length, {
    config: { mass: 3, tension: 2500, friction: 200 },
    from: {
      opacity: 0,
      x: -20,
      y: -20,
    },
    to: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  });

  // On crée un array pour mettre en surbrillance les dates exclues
  const excludeDatesArray = [];
  for (const date of occupiedDates) {
    const firstDate = new Date(date[0]);
    const lastDate = new Date(date[1]);

    const intervalArr = eachDayOfInterval({
      start: firstDate,
      end: lastDate,
    });

    excludeDatesArray.push(...intervalArr);
  }
  // On crée un array remplie des objets Date (dates occupées) nécessaires à DatePicker
  const exludeDatesObjArr = occupiedDates.map((date) => ({
    start: subDays(new Date(date[0]), 0),
    end: new Date(date[1]),
  }));

  // On crée une fonction et des eventListeners qui vont écouter le changement de mois
  // Quand on change de mois il faut changer la valeur de l'attribut "openToDate" du calendrier
  const handleChangeMonth = (ev) => {
    const datePickerContainer = document.querySelector(
      ".reservation-left-side"
    );

    let target = ev.target;

    // On regarde si on a avancé ou reculé d'1 mois
    let prevOrNext;
    if (
      target.classList.contains("react-datepicker__navigation--next") ||
      target.classList.contains("react-datepicker__navigation-icon--next")
    ) {
      prevOrNext = "next";
    } else {
      prevOrNext = "prev";
    }
    const addOrSub = prevOrNext === "next" ? 30 : -30;

    // La target devient la div parent pour la comparer à "datePickerContainer.children"
    while (target.parentElement.className !== "reservation-left-side") {
      target = target.parentElement;
    }

    // On cherche l'index du calendrier dans le container
    let index;
    for (let i = 0; i < datePickerContainer.children.length; i++) {
      if (target === datePickerContainer.children[i]) {
        index = i;
      }
    }

    // On change le state pour modifier le "openToDate" du calendrier qui correspond
    // RAPPEL : l'index du calendrier dans le container === l'index du state qui correspond dans startingDatesArr (array utilisé dans "openToDate")
    if (index === 0) {
      setActualDate(addDays(actualDate, addOrSub));
    } else if (index === 1) {
      setDateOneMonth(addDays(dateOneMonth, addOrSub));
    } else if (index === 2) {
      setDateTwoMonth(addDays(dateTwoMonth, addOrSub));
    } else if (index === 3) {
      setDateThreeMonth(addDays(dateThreeMonth, addOrSub));
    }
  };
  useEffect(() => {
    const navigationArrows = document.querySelectorAll(
      ".react-datepicker__navigation"
    );

    navigationArrows.forEach((arrow) => {
      arrow.addEventListener("click", handleChangeMonth);
    });

    return () => {
      navigationArrows.forEach((arrow) => {
        arrow.removeEventListener("click", handleChangeMonth);
      });
    };
  });

  const reservFunc = () => {
    const interval = [
      `${new Date(startDate).getFullYear()}-${
        new Date(startDate).getMonth() + 1
      }-${new Date(startDate).getDate()}`,
      `${new Date(endDate).getFullYear()}-${
        new Date(endDate).getMonth() + 1
      }-${new Date(endDate).getDate()}`,
    ];

    setOccupiedDates((state) => [...state, interval]);
    setStartDate(null);
    setEndDate(null);
    setNumberOfDays(0);
    setTotalPrice(0);
  };

  return (
    <div className="container reservation-container">
      <div className="reservation-left-side">
        {trail.map((style, index) => (
          <a.div style={style} key={uuidv4()}>
            <DatePicker
              calendarClassName="reservation-date-picker"
              locale="fr"
              inline
              disabledKeyboardNavigation
              openToDate={startingDatesArr[index]}
              excludeDateIntervals={exludeDatesObjArr}
              highlightDates={excludeDatesArray}
              onChange={handleChange}
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              selectsRange
            />
          </a.div>
        ))}
      </div>

      <div className="reservation-right-side">
        <div className="tarifs-container">
          <h1>
            <u>Tarifs :</u>
          </h1>
          <br />
          <ul className="tarif-list">
            <li>{weekDayPrice}€ / nuit en semaine</li>
            <li>
              {weekendDayPricesArr[0]}€ / nuit en weekend (vendredi et samedi)
            </li>
            <li>
              {weekendDayPricesArr[1]}€ pour 2 nuits en weekend (vendredi et
              samedi)
            </li>
          </ul>
        </div>
        <div className="booking-container">
          <h2>Pour réserver, cliquez sur ce bouton</h2>
          {/* <a
            href="https://www.booking.com/index.fr.html"
            target="_blank"
            rel="noreferrer"
            className="booking-link"
            title="Ce bouton ouvrira un nouvel onglet vers Booking.com"
          > */}
          <button type="button" className="booking-btn" onClick={reservFunc}>
            Réserver
          </button>
          {/* </a> */}
          <br />
          <div className="booking-preview">
            {!hasSelectInvalidDays.invalid ? (
              <>
                <p>
                  Vous souhaitez réserver : <br />
                  (sélectionnez vos dates sur {innerWidth <= 800
                    ? "le"
                    : "un"}{" "}
                  calendrier !) <br /> <br className="breakTextSpace" />
                  du{" "}
                  {startDate && !hasSelectInvalidDays.invalid ? (
                    <strong>
                      {startDate.getDate() < 10
                        ? `0${startDate.getDate()}`
                        : startDate.getDate()}
                      {"/"}
                      {startDate.getMonth() + 1 < 10
                        ? `0${startDate.getMonth() + 1}`
                        : startDate.getMonth() + 1}
                      {"/"}
                      {startDate.getFullYear()}
                    </strong>
                  ) : (
                    "------"
                  )}{" "}
                  à partir de <strong>14h</strong> <br />
                  au{" "}
                  {endDate && !hasSelectInvalidDays.invalid ? (
                    <strong>
                      {addDays(endDate, 1).getDate() < 10
                        ? `0${addDays(endDate, 1).getDate()}`
                        : addDays(endDate, 1).getDate()}
                      {"/"}
                      {addDays(endDate, 1).getDate() === 1
                        ? `0${endDate.getMonth() + 2}`
                        : endDate.getMonth() + 1 < 10
                        ? `0${endDate.getMonth() + 1}`
                        : endDate.getMonth() + 1}
                      {"/"}
                      {endDate.getFullYear()}
                    </strong>
                  ) : (
                    "------"
                  )}{" "}
                  jusqu'à <strong>11h</strong>
                </p>
                <br className="breakTextSpace" />
                <p>
                  Pour : {numberOfDays} nuit{numberOfDays > 1 && "s"}{" "}
                  {numberOfDays === 0
                    ? ""
                    : totalWeekendDays === 0
                    ? "en semaine"
                    : totalWeekendDays === numberOfDays
                    ? "en weekend"
                    : totalWeekendDays === 1
                    ? `dont ${totalWeekendDays} nuit en weekend`
                    : totalWeekendDays > 1
                    ? `dont ${totalWeekendDays} nuits en weekend`
                    : ""}
                  <br />
                  Prix : <strong>{totalPrice}€</strong>
                </p>
              </>
            ) : (
              <div className="booking-preview-error-card">
                <p className="booking-preview-error">
                  {hasSelectInvalidDays.reason} <br />
                  Veuillez vérifier vos dates et réessayer.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

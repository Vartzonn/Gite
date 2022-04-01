import React, { useState, useEffect, useRef } from "react";
import "./Contact.css";
import { animated, Spring } from "react-spring";
import emailjs from "@emailjs/browser";
import Spinner from "../../Components/Spinner/Spinner";

let mailResetTimer = 4000;

export default function Contact() {
  const [imgHeight, setImgHeight] = useState(
    document.documentElement.clientHeight - 3.6 * 16
  );
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [mailSent, setMailSent] = useState(false);
  const [errorMailSent, setErrorMailSent] = useState(false);
  const [mailLoading, setMailLoading] = useState(false);

  // Pour l'envoi du mail
  const form = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();

    setMailLoading(true);

    emailjs
      .sendForm(
        "gmail",
        "template_hjph0at",
        form.current,
        "user_bQaBzi5ulmDVNjw3T4EsZ"
      )
      .then(
        (result) => {
          console.log(result.text);
          setMailSent(true);
          setErrorMailSent(false);
          setMailLoading(false);
          const timer = setTimeout(() => {
            setMailSent(false);
            clearTimeout(timer);
          }, mailResetTimer);
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
          setMailSent(true);
          setErrorMailSent(true);
          setMailLoading(false);
          const timer = setTimeout(() => {
            setMailSent(false);
            clearTimeout(timer);
          }, mailResetTimer);
        }
      );
  };

  // Pour que la height de l'image ne dépasse pas la hauteur de l'écran
  const handleResize = () => {
    setImgHeight(document.documentElement.clientHeight - 3.6 * 16);
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container contact-container">
      {innerWidth > 1000 && (
        <div className="contact-img-container">
          <img
            className="contact-img"
            src={process.env.PUBLIC_URL + "/imgs/imgContact.jpg"}
            alt="Une belle rue de la commune de Montreuil-sur-Mer"
          />
        </div>
      )}

      <div className="contact-info" style={{ height: `${imgHeight}px` }}>
        <div className="contact-phone">
          <h1>{innerWidth > 490 && "📞"} Nous joindre par téléphone :</h1>
          <p>
            +33 (0)x xx xx xx xx
            <br />
            OU
            <br />
            +33 (0)x xx xx xx xx
          </p>
        </div>

        <h1 className="mail-title">{innerWidth > 490 && "📩"} Ou par mail :</h1>
        <form ref={form} className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-inputs">
            <div>
              <label htmlFor="name">Nom/Prénom :</label>
              <input
                type="text"
                placeholder="Nom/Prénom"
                id="name"
                name="name"
              />
            </div>
            <div>
              <label htmlFor="email">Adresse mail* :</label>
              <input
                type="email"
                required
                placeholder="Adresse mail"
                id="email"
                name="email"
              />
            </div>
          </div>
          <label htmlFor="message" className="contact-message-label">
            Votre message* :
          </label>
          <textarea
            placeholder="Votre message"
            required
            id="message"
            name="message"
          ></textarea>
          {/* On rajoute un loader quand le mail a été envoyé et qu'on attend la réponse d'Emailjs */}
          {mailLoading && (
            <div className="spinner-container">
              <Spinner />
            </div>
          )}
          <p
            className={
              mailSent
                ? "contact-mail-sent mail-sent-display"
                : "contact-mail-sent"
            }
            style={{ color: errorMailSent ? "red" : "lime" }}
          >
            {errorMailSent
              ? "Une erreur s'est produite, veuillez réessayer"
              : "Votre mail a bien été envoyé !"}
          </p>
          <button
            type="submit"
            className="contact-button"
            style={{ marginTop: mailLoading ? ".2rem" : "1rem" }}
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { animated, Spring } from "react-spring";
import Card from "../../Components/Card/Card";
import "./Home.css";

export default function Home() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [firstVisit, setFirstVisit] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem("firstVisit")) {
      sessionStorage.setItem("firstVisit", true);
    } else {
      setFirstVisit(false);
    }
  }, []);
  const closeModal = () => {
    setFirstVisit(false);
  };

  const handleResize = () => {
    setInnerWidth(window.innerWidth);
    setInnerHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="home-container">
      {firstVisit && (
        <div className="first-visit-container">
          <h3><u>Message d'information :</u></h3>
          <br />
          <p>
            Le gîte n'étant pas encore terminé, aucune photo ne correspond
            à la réalité et les réservations ne sont pas actives.
          </p>
          <br />
          <p>Merci de votre compréhension.</p>
          <br />
          <button className="first-visit-btn"type="button" onClick={closeModal} aria-label="Fermer la fenêtre modale">Fermer</button>
        </div>
      )}
      <Spring
        from={{
          opacity: 0,
          height: innerHeight < 550 ? "550px" : `${innerHeight - 0.1}px`,
        }}
        to={[
          {
            opacity: 1,
            height: innerHeight < 550 ? "550px" : `${innerHeight - 0.1}px`,
          },
        ]}
      >
        {(styles) => (
          <animated.div className="home-background" style={styles}>
            <div className="home-title-container">
              <h1 className="home-title">
                Gîte de <br /> Buire-le-Sec
              </h1>
              <div className="home-adresse">
                <p>
                  Retrouvez-nous au <br />
                  <strong>18 rue de Maintenay</strong>
                  <br /> à <strong>Buire-le-Sec</strong>
                </p>
              </div>
            </div>
            <div className="home-card-container">
              {innerWidth > 1050 ? (
                <>
                  <Card
                    title="Photos"
                    innerWidth={innerWidth}
                    innerHeight={innerHeight}
                  />
                  <Card
                    title="Tourisme"
                    innerWidth={innerWidth}
                    innerHeight={innerHeight}
                  />
                  <Card
                    title="Réservation"
                    innerWidth={innerWidth}
                    innerHeight={innerHeight}
                  />
                  <Card
                    title="Contact"
                    innerWidth={innerWidth}
                    innerHeight={innerHeight}
                  />
                </>
              ) : (
                <>
                  <div>
                    <Card
                      title="Photos"
                      innerWidth={innerWidth}
                      innerHeight={innerHeight}
                    />
                    <Card
                      title="Tourisme"
                      innerWidth={innerWidth}
                      innerHeight={innerHeight}
                    />
                  </div>
                  <div>
                    <Card
                      title="Réservation"
                      innerWidth={innerWidth}
                      innerHeight={innerHeight}
                    />
                    <Card
                      title="Contact"
                      innerWidth={innerWidth}
                      innerHeight={innerHeight}
                    />
                  </div>
                </>
              )}
            </div>
          </animated.div>
        )}
      </Spring>
    </div>
  );
}

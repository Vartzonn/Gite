import { Link } from "react-router-dom";
import { animated, Spring } from "react-spring";
import "./Card.css";

export default function Card(props) {
  let path = props.title.toLowerCase();
  if (path === "réservation") {
    path = path.replace("é", "e");
  }

  return (
    <Spring
      from={{ opacity: 0, x: -20, y: -20 }}
      to={[{ opacity: 1, x: 0, y: 0 }]}
    >
      {(styles) => (
        <animated.div className="card-container" style={styles}>
          <Link to={`${process.env.PUBLIC_URL}/${path}`} className="card-link">
            <div className="card">
              <h2 className="card-title">{props.title}</h2>
              {(props.innerWidth > 1050 && props.innerHeight > 550) && (
                <img
                  src={process.env.PUBLIC_URL + `/imgs/home/${path}.webp`}
                  alt="Paysage"
                  className="card-img"
                />
              )}
            </div>
          </Link>
        </animated.div>
      )}
    </Spring>
  );
}

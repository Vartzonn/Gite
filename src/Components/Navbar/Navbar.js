import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const linksArray = ["Photos", "Tourisme", "Reservation", "Contact"];

  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="navbar">
      <Link to="/">
        <img
          src={process.env.PUBLIC_URL + "imgs/navIcons/house-icon.svg"}
          alt="house icon"
          loading="lazy"
          title="Accueil"
          className="navbar-icon"
        />
      </Link>

      <div className="navbar-links-container">
        {linksArray.map((link) => (
          <Link
            key={link}
            to={`${process.env.PUBLIC_URL}/${link.toLowerCase()}`}
            className="navbar-links"
          >
            {innerWidth > 640 ? (
              link === "Reservation" ? (
                "Réservation"
              ) : (
                link
              )
            ) : (
              <img
                src={process.env.PUBLIC_URL + `imgs/navIcons/${link}-icon.svg`}
                alt={`${link} icon`}
                loading="lazy"
                title={link === "Reservation" ? "Réservation" : link}
              />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}

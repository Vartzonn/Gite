import { useState, useEffect } from "react";
import "./SlideShow.css";
import { animated, Spring } from "react-spring";
import Slider from "./Slider/Slider";

export default function SlideShow(props) {
  const [firstShow, setFirstShow] = useState(true);
  const [imageIndex, setImageIndex] = useState(1);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  const toggleActiveFunc = (e) => {
    const allSlideshows = document.querySelectorAll(".slideshow");
    let target = e.target;

    if (
      !target.classList.contains("btn-slide") &&
      !target.classList.contains("dot")
    ) {
      while (!target.classList.contains("slideshow")) {
        target = target.parentElement;
      }

      // Pour n'avoir qu'un seul slider ouvert
      props.setSlideOpen((state) => {
        if (target.id === state[0]) {
          return [];
        } else {
          return [target.id];
        }
      });

      for (let i = 0; i < allSlideshows.length; i++) {
        if (allSlideshows[i] !== target) {
          allSlideshows[i].classList.remove("slideshow-active");
        }
      }

      target.classList.toggle("slideshow-active");
      target.style.transform = "translateZ(-80px)";
    }
  };

  // Au hover, si aucun slideshow est actif, on rajoute un effet
  let noOnesActive = true;
  const handleOver = (e) => {
    const allSlideshows = document.querySelectorAll(".slideshow");
    let target = e.target;

    while (!target.classList.contains("slideshow")) {
      target = target.parentElement;
    }

    for (let i = 0; i < allSlideshows.length; i++) {
      if (allSlideshows[i].classList.contains("slideshow-active")) {
        noOnesActive = false;
      }
    }

    if (noOnesActive && e._reactName === "onMouseEnter") {
      if (allSlideshows[0] === target) {
        target.style.transform = "translateZ(-40px) translateX(10px)";
      } else if (allSlideshows[1] === target) {
        target.style.transform = "translateZ(-40px)";
      } else if (allSlideshows[2] === target) {
        target.style.transform = "translateZ(-40px) translateX(-10px)";
      }
    } else if (noOnesActive && e._reactName === "onMouseLeave") {
      target.style.transform = "translateZ(-80px)";
    }
    noOnesActive = true;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFirstShow(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="slideshow"
      id={props.id}
      onClick={innerWidth > 1000 ? toggleActiveFunc : undefined}
      onMouseEnter={innerWidth > 1000 ? handleOver : undefined}
      onMouseLeave={innerWidth > 1000 ? handleOver : undefined}
    >
      <div className="slideshow-title-container">
        <h2 className="slideshow-title">{props.title}</h2>
      </div>
      <div className="slideshow-img-container">
        {props.id === props.slideOpen[0] || innerWidth <= 1000 ? (
          <Slider
            src={props.imgSrc}
            nbPhotos={props.nbPhotos}
            imageIndex={imageIndex}
            setImageIndex={setImageIndex}
          />
        ) : firstShow ? (
          <Spring from={{ opacity: 0 }} to={[{ opacity: 1 }]}>
            {(styles) => (
              <animated.img
                className="slideshow-img"
                style={styles}
                src={
                  process.env.PUBLIC_URL +
                  `/imgs/photosPage/${props.imgSrc}/${props.imgSrc}1.webp`
                }
                alt={props.title}
              ></animated.img>
            )}
          </Spring>
        ) : (
          <img
            className="slideshow-img"
            src={
              process.env.PUBLIC_URL +
              `/imgs/photosPage/${props.imgSrc}/${props.imgSrc}${imageIndex}.webp`
            }
            alt={props.title}
          />
        )}
      </div>
    </div>
  );
}

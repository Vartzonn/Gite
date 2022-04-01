import { useState, useEffect } from "react";
import "./Slider.css";
import BtnSlider from "./BtnSlider";
import { v4 as uuidv4 } from "uuid";

const resetAnimTimer = 550;

export default function Slider(props) {
  const [slideAnim, setSlideAnim] = useState({
    index: props.imageIndex,
    inProgress: false,
  });

  // On remplit un array d'id pour les keys des sliders
  const [dataSlider, setDataSlider] = useState([]);
  useEffect(() => {
    setDataSlider(Array.from({ length: props.nbPhotos }, () => uuidv4()));

    return () => {
      setDataSlider([]);
    };
  }, []);

  const nextSlide = () => {
    if (slideAnim.inProgress) return;
    if (slideAnim.index !== props.nbPhotos) {
      props.setImageIndex(slideAnim.index + 1);
      setSlideAnim({
        index: slideAnim.index + 1,
        inProgress: true,
      });
    } else if (slideAnim.index === props.nbPhotos) {
      props.setImageIndex(1);
      setSlideAnim({
        index: 1,
        inProgress: true,
      });
    }
    setTimeout(() => {
      props.setImageIndex(
        slideAnim.index === props.nbPhotos ? 1 : slideAnim.index + 1
      );
      setSlideAnim({
        index: slideAnim.index === props.nbPhotos ? 1 : slideAnim.index + 1,
        inProgress: false,
      });
    }, resetAnimTimer);
  };

  const prevSlide = () => {
    if (slideAnim.inProgress) return;
    if (slideAnim.index !== 1) {
      props.setImageIndex(slideAnim.index - 1);
      setSlideAnim({
        index: slideAnim.index - 1,
        inProgress: true,
      });
    } else if (slideAnim.index === 1) {
      props.setImageIndex(props.nbPhotos);
      setSlideAnim({
        index: props.nbPhotos,
        inProgress: true,
      });
    }
    setTimeout(() => {
      props.setImageIndex(
        slideAnim.index === 1 ? props.nbPhotos : slideAnim.index - 1
      );
      setSlideAnim({
        index: slideAnim.index === 1 ? props.nbPhotos : slideAnim.index - 1,
        inProgress: false,
      });
    }, resetAnimTimer);
  };

  const moveDot = (index) => {
    props.setImageIndex(index);
    setSlideAnim({
      index: index,
      inProgress: false,
    });
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  });

  return (
    <div className="container-slider">
      {dataSlider.map((obj, index) => {
        return (
          <div
            key={obj}
            className={
              slideAnim.index === index + 1 ? "slide active-anim" : "slide"
            }
          >
            <img
              src={
                process.env.PUBLIC_URL +
                `/imgs/photosPage/${props.src}/${props.src}${index + 1}.webp`
              }
              alt={props.src}
              loading="lazy"
            />
          </div>
        );
      })}
      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />

      <div className="container-dots">
        {Array.from({ length: props.nbPhotos }).map((item, index) => {
          return (
            <div
              key={index}
              className={slideAnim.index === index + 1 ? "dot active" : "dot"}
              onClick={() => moveDot(index + 1)}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

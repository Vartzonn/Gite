import { useState } from "react";
import SlideShow from "../../Components/SlideShow/SlideShow";
import "./Photos.css";

export default function Photos() {
  const [slideOpen, setSlideOpen] = useState([]);

  return (
    <div className="container photos-container">
      <div className="slideshow-container">
        <SlideShow
          title="La famille"
          imgSrc="famille"
          nbPhotos={3}
          slideOpen={slideOpen}
          setSlideOpen={setSlideOpen}
          id="first-slideshow"
        />
        <SlideShow
          title="Le gîte"
          imgSrc="gite"
          nbPhotos={6}
          slideOpen={slideOpen}
          setSlideOpen={setSlideOpen}
          id="second-slideshow"
        />
        <SlideShow
          title="Lieux à visiter"
          imgSrc="visit"
          nbPhotos={4}
          slideOpen={slideOpen}
          setSlideOpen={setSlideOpen}
          id="third-slideshow"
        />
      </div>
    </div>
  );
}

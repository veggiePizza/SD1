import React from "react";

export default function Dots({ slides = [], currentSlide = 0, goToSlide }) {
  return (
    <div className="dots">
      {slides.length &&
        slides.map((s, i) => {
          return (
            <div
              key={i}
              onClick={() => goToSlide(i)}
              className={`dot ${i === currentSlide ? "dot-active" : ""}`}
            />
          );
        })}
    </div>
  );
}

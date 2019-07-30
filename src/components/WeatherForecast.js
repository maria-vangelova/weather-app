import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import DayCard from "./DayCard";

function WeatherForecast({ forecastData, getSelectedDay }) {
  const [currentIndex, changeCurrentIndex] = useState(0);
  const [translateValue, changeTranslateValue] = useState(0);
  const forecastInfo = forecastData.data;

  useEffect(() => {
    getSelectedDay(currentIndex);
  }, [currentIndex]);

  const goToPrevSlide = () => {
    if (currentIndex === 0) return;

    changeCurrentIndex(currentIndex - 1);
    changeTranslateValue(translateValue + slideWidth());
  };

  const goToNextSlide = () => {
    if (currentIndex === forecastInfo.length - 1) {
      return changeCurrentIndex(0), changeTranslateValue(0);
    }

    changeCurrentIndex(currentIndex + 1);
    changeTranslateValue(translateValue + -slideWidth());
  };

  const slideWidth = () => {
    return document.querySelector(".day-card").clientWidth;
  };

  return (
    <div className="slider">
      <div
        className="slider-wrapper"
        style={{
          transform: `translateX(${translateValue}px)`,
          transition: "transform ease-out 0.45s"
        }}
      >
        {forecastInfo.map(info => (
          <DayCard info={info} key={info.datetime} />
        ))}
      </div>
      <LeftArrow goToPrevSlide={goToPrevSlide} />

      <RightArrow goToNextSlide={goToNextSlide} />
    </div>
  );
}

const LeftArrow = ({ goToPrevSlide }) => {
  return (
    <div className="backArrow arrow" onClick={goToPrevSlide}>
      <i className="icon-info circle-left" />
    </div>
  );
};

const RightArrow = ({ goToNextSlide }) => {
  return (
    <div className="nextArrow arrow" onClick={goToNextSlide}>
      <i className="icon-info circle-right" />
    </div>
  );
};

WeatherForecast.propTypes = {
  forecastData: PropTypes.shape({
    data: PropTypes.array,
  }),
  getSelectedDay: PropTypes.func
};

export default WeatherForecast;

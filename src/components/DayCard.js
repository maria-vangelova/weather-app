import React from "react";
import PropTypes from "prop-types";

const DayCard = ({ info }) => {

  const formatCurrentDate = datetime => {
    let date = new Date(datetime);
    date = date.toLocaleString("bg-BG", { weekday: "long" });

    return date;
  };

  return (
    <div className="day-card">
      <hgroup>
        <h3 className="title-today">{formatCurrentDate(info.datetime)}</h3>
        <h4 className="date-today">{info.datetime}</h4>
      </hgroup>
      <div className="weather-info-holder">
        <i className={`icon-weather ${info.weather.icon}`} />
        <p className="min-max-temp">
          {info.min_temp}&deg; / {info.max_temp}&deg;
        </p>
        <p className="to-capital-first-letter desc">{info.weather.description}</p>
      </div>
    </div>
  );
};

DayCard.propTypes = {
  info: PropTypes.shape({
    datetime: PropTypes.string,
    weather: PropTypes.object,
    min_temp: PropTypes.number,
    max_temp: PropTypes.number,
  })
};

export default DayCard;

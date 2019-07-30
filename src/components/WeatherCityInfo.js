import React, { useEffect } from "react";
import PropTypes from "prop-types";

const WeatherCityInfo = ({ forecastData, forecastSelectedDay }) => {
  const weeklyForecastData = forecastData.data[forecastSelectedDay];

  const formatName = str => {
    let formated = "";

    if (str && str.length) {
      formated = str;
      let idx = str.indexOf(" /");

      if (idx != -1) {
        formated = str.substring(0, idx);
      }

      if (formated == 'Марица') return 'Пловдив';
      if (formated == 'Самоков') return 'София - Област';
      if (formated == 'Столична') return 'София';
    }
    return formated;
  };

  const formatTime = time => {
    let date = new Date(time * 1000);
    let hours = date.getHours();
    let min = "0" + date.getMinutes();

    return `${hours}:${min.substr(-2)}`;
  };

  return (
    <section className="detailed-info-section">
      <hgroup>
        <h3 className="">Град: {formatName(forecastData.city_name)}</h3>
        <h4 className="">{weeklyForecastData.datetime}</h4>
      </hgroup>
      <ul className="info-holder">
        <li>Температура: {weeklyForecastData.temp}&deg;</li>
        <li>
          Описание:
          <span className="to-capital-first-letter">
            {weeklyForecastData.weather.description}
          </span>
        </li>
        <li>
          <i className="icon-info min-temperature" /> Мин Температура:{" "}
          {weeklyForecastData.min_temp}&deg;
        </li>
        <li>
          <i className="icon-info max-temperature" /> Мах Температура:{" "}
          {weeklyForecastData.max_temp}&deg;
        </li>
        <li>
          <i className="icon-info pressure" /> Атмосферно налягане:{" "}
          {weeklyForecastData.pres.toFixed(2)}
        </li>
        <li>
          <i className="icon-info humidity" /> Влажност: {weeklyForecastData.rh}
          %
        </li>
        <li>
          <i className="icon-info wind" /> Вятър:{" "}
          {weeklyForecastData.wind_spd.toFixed(2)}м/с
        </li>
        <li>
          <i className="icon-info wind" /> Посока на вятъра:{" "}
          {weeklyForecastData.wind_cdir_full}
        </li>
        <li>
          <i className="icon-info sunrise" />
          Изгрев: {formatTime(weeklyForecastData.sunrise_ts)}
        </li>
        <li>
          <i className="icon-info sunset" />
          Залез: {formatTime(weeklyForecastData.sunset_ts)}
        </li>
      </ul>
    </section>
  );
};

WeatherCityInfo.propTypes = {
  forecastData: PropTypes.shape({
    city_name: PropTypes.string,
    datetime: PropTypes.string,
    temp: PropTypes.number,
    weather: PropTypes.object,
    min_temp: PropTypes.number,
    max_temp: PropTypes.number,
    pres: PropTypes.number,
    rh: PropTypes.number,
    wind_spd: PropTypes.number,
    wind_cdir_full: PropTypes.string,
    sunset_ts: PropTypes.number,
    sunrise_ts: PropTypes.number,
  }),
  forecastSelectedDay: PropTypes.number
};

export default WeatherCityInfo;

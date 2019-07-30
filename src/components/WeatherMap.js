import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Map } from "../assets/bg-map.svg";

const WeatherMap = ({ getActiveCity }) => {
  return (
    <div className="map-container">
      <Map onClick={getActiveCity} />
    </div>
  );
};

WeatherMap.propTypes = {
  getActiveCity: PropTypes.func
};

export default WeatherMap;

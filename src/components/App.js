import React from "react";
import axios from "axios";
import apiKey from '../apiKey';

import Header from "./Header";
import WeatherMap from "./WeatherMap";
import WeatherForecast from "./WeatherForecast";
import WeatherCityInfo from "./WeatherCityInfo";
import Footer from "./Footer";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      weatherData: {},
      activeCity: "",
      forecastSelectedDay: 0,
      currentTimeStamp: ''
    }
  }

  componentDidMount() {
    const date = new Date();
    const formatedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    this.setState({ currentTimeStamp: formatedDate });
  }

  // Get Active City
  getActiveCity = event => {
    const activeCity = this.state.activeCity;
    const targetElement = event.target;
    const selectedCity = targetElement.getAttribute("name");
    const cityClass = targetElement.className;

    if (targetElement.tagName != 'path') return;

    if (selectedCity == activeCity) {
      this.setState({ activeCity: false });
      cityClass.baseVal = '';

    } else {
      this.getCityForecast(selectedCity);
      this.setState({ activeCity: selectedCity });

      targetElement.parentElement.querySelectorAll('path.active').forEach(node =>
        node.className.baseVal = ''
      );

      cityClass.baseVal = 'active';
    }
  };

  // Get data from localStorage and setState if the active city data exist or is actual,
  // otherwise call function for fetching data from weather API
  getCityForecast = (city) => {
    const localStorageRef = localStorage.getItem(city);

    if (localStorageRef) {
      const { cityInfo, timestamp } = JSON.parse(localStorageRef);

      if (this.state.currentTimeStamp == timestamp) {
        // Exit if state weater data is actual
        if (this.state.weatherData.state_code == city) return;

        this.setState({ weatherData: cityInfo });

        return;
      }

      localStorage.removeItem(city);
      this.fetchData(city);

      return;
    }

    this.fetchData(city);
  };

  // Fetch data from API
  fetchData = async (city) => {
    const postal_code = {
      "BLG": "2700",
      "BGS": "8000",
      "VAR": "9000",
      "VTR": "5000",
      "VID": "3700",
      "VRC": "3000",
      "GAB": "5300",
      "DOB": "9300",
      "KRZ": "6600",
      "KNL": "2500",
      "LOV": "5500",
      "MON": "3400",
      "PAZ": "4400",
      "PER": "2300",
      "PVN": "5800",
      "PDV": "4003",
      "RAZ": "7200",
      "RSE": "7000",
      "SLS": "7500",
      "SLV": "8800",
      "SML": "4700",
      "SOF": "1000",
      "SZR": "6000",
      "TGV": "7700",
      "HKV": "6300",
      "SHU": "9700",
      "JAM": "8600",
      "SFO": "2000"
    };

    const forecast = await axios(`http://api.weatherbit.io/v2.0/forecast/daily?postal_code=${postal_code[city]}&country=BG&days=7&lang=bg&key=${apiKey.key}`)
      .then(response => { return response.data })
      .catch(error => console.log(error.response));

    this.setState({ weatherData: forecast });

    // Save active city data in localStorage
    const storageObj = { cityInfo: forecast, timestamp: this.state.currentTimeStamp };
    localStorage.setItem(city, JSON.stringify(storageObj));
  }

  // Get the selected day of forecast
  getSelectedDay = (index) => {
    this.setState({ forecastSelectedDay: index });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <WeatherMap getActiveCity={this.getActiveCity} />
        {this.state.activeCity == this.state.weatherData.state_code ? (
          <React.Fragment>
            <WeatherCityInfo forecastData={this.state.weatherData} forecastSelectedDay={this.state.forecastSelectedDay} />
            <WeatherForecast forecastData={this.state.weatherData} getSelectedDay={this.getSelectedDay} />
          </React.Fragment>
        ) : (
            <p className="info-msg">Моля, изберете област от картата.</p>
          )}
        <Footer />
      </React.Fragment>
    );
  }
}
export default App;

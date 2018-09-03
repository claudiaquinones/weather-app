import React from "react";
import Titles from "./components/Titles.js";
import Form from "./components/Form.js";
import Weather from "./components/Weather.js";

const OPENWEATHER_KEY = process.env.REACT_APP_KEY_1;
const MAPQUEST_KEY = process.env.REACT_APP_KEY_2;

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    state: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    forecast: undefined,
    error: undefined
  }

  //Function responsible for taking user data, calling api, and changing state.
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const openWeatherCall_1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${OPENWEATHER_KEY}`);
    const openWeatherCall_2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${OPENWEATHER_KEY}`);
    const currentData = await openWeatherCall_1.json();
    const forecastData = await openWeatherCall_2.json();

    if(currentData.cod !== "404" && forecastData.cod !== "404"){
      let fiveDayArray = [];
      let regex = /\d\d-\d\d 15:00:00/;

      for(let i = 0; i < forecastData.list.length; i++){
        if(regex.test(forecastData.list[i]['dt_txt'])){
          let icon_url = `http://openweathermap.org/img/w/${forecastData.list[i].weather[0].icon}.png`;
          fiveDayArray.push({
            date: forecastData.list[i]['dt_txt'].match(/\d\d-\d\d /),
            icon_path: icon_url,
            description: forecastData.list[i].weather[0].main,
            avg_temp: Math.round(forecastData.list[i].main.temp*(9/5) - 459.67)
          });
        }
      }

      const LAT = currentData.coord.lat;
      const LON = currentData.coord.lon;
      const mapQuestCall = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${MAPQUEST_KEY}&location=${LAT},${LON}`);
      const geoData = await mapQuestCall.json();

      this.setState({
        temperature: Math.round(currentData.main.temp*(9/5)-459.67),
        city: currentData.name,
        state: geoData.results[0]['locations'][0].adminArea3,
        country: currentData.sys.country,
        humidity: currentData.main.humidity,
        description: currentData.weather[0]['description'],
        forecast: fiveDayArray,
        error: ''
      });
    }
    else {
      this.setState({
        temperature: undefined,
        city: undefined,
        state: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        forecast: undefined,
        error: 'Location not found.'
      })
    }
  }

  render(){
    return(
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-12 title-container">
                  <Titles />
                </div>
                <div className="col-xs-0 col-sm-0 col-med-5 col-lg-5 col-xl-5 background12"></div>
              </div>
              <div className="row">
                <div className="col-12 form-container">
                  <div className="form-container__input">
                    <Form getWeather={this.getWeather}/>
                  </div>
                  <Weather temperature={this.state.temperature}
                    city={this.state.city}
                    state={this.state.state}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    forecast={this.state.forecast}
                    error={this.state.error}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
  );
  }
}

export default App;

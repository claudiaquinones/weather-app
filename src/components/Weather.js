import React from "react";

const Weather = (props) => (

  <div className="weather__info text-center">
    {
      props.country && props.country !== 'US' ? <p><br/>Location:
      <span className="weather__value"> {props.city}, {props.country} </span></p>: <p></p>
    }
    {
      props.city && props.country === 'US' && <p><br/>Location:
      <span className="weather__value"> {props.city}, {props.state} </span></p>
    }
    {
      props.temperature && <p className="text-info font-italic">Currently {props.temperature}&#8457; with {props.humidity}% humidity and {props.description}</p>
    }
    {
      props.error && <p>
      <span className="weather__error"><br/> {props.error}</span></p>
    }
    {
      props.forecast && <p><br/>Forecast<hr/>
      <div className="row forecast__container">
        {
          props.forecast.map((v,i) => <div className="col-xs-12 col-sm-12 col-md-10 col-lg-1 col-xl-2 weather__forecast" key={i}>
          {v.date[0]}<br/>
          <img id="frame" alt="icon" src={v.icon_path}/><br/>
          {v.avg_temp}&#8457;<br/>
          {v.description}<br/>
          <hr/>
          </div>)
        }
      </div>
      </p>
    }
  </div>
);

export default Weather;

import React from "react";

const Form = props => (
  <form autoComplete="off" onSubmit={props.getWeather} className="form-container__input">
    <input className="form-control" type="text" name="city" placeholder="city/zip-code" required/>
    <input className="form-control" type="text" name="country" placeholder="country" required/>
    <button className="btn btn-primary btn-lg">Search</button>
  </form>
);

export default Form;

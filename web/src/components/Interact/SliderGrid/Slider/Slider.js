import React from 'react';

function Slider(props) {
  return (
    <form>
      <div className="form-group d-flex align-items-center">
        <input
          type="range"
          min={props.min || 0}
          max={props.max || 1}
          step={props.step || 0.01}
          value={props.value}
          className="form-control-range"
          onChange={props.changeHandler}
          id="formControlRange"
        />
        <h2 className="m-0 ml-2 d-inline-block">
          {props.fix ? props.value : Number(props.value).toFixed(2)}
        </h2>
      </div>
    </form>
  );
}

export default Slider;

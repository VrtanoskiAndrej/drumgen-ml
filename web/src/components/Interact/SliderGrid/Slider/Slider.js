import React, { useState } from 'react';

function Slider(props) {
  const [value, setValue] = useState((0.0).toFixed(2));
  const changeHandler = e => {
    setValue(e.target.value);
  };
  return (
    <div>
      <form>
        <div className="form-group form-inline">
          <input
            type="range"
            min="-1"
            max="1"
            step="0.01"
            value={value}
            className="form-control-range"
            onChange={changeHandler}
            id="formControlRange"
          />
          <h2 className="m-0 ml-2 d-inline-block"> {value} </h2>
        </div>
      </form>
    </div>
  );
}

export default Slider;

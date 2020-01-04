import React from 'react';

function SeedField(props) {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon3">
          Enter Seed for Generation:
        </span>
      </div>
      <input
        type="text"
        className="form-control"
        id="basic-url"
        aria-describedby="basic-addon3"
      />
    </div>
  );
}

export default SeedField;

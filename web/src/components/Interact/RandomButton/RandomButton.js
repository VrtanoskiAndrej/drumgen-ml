import React from 'react';

function RandomButton(props) {
  return (
    <button onClick={props.click} className="btn btn-danger">
      {props.children}
    </button>
  );
}

export default RandomButton;

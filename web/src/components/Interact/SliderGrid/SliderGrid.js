import React from 'react';
import Slider from './Slider/Slider';

function SliderGrid(props) {
  const size = props.size || 8;
  const grid = Array(size)
    .fill(0)
    .map((row, index) => (
      <Slider
        key={index.toString()}
        id={index}
        min={-1}
        max={1}
        value={props.gridValues[index]}
        changeHandler={e => props.updateHandler(index, e)}
      />
    ));

  return <div className={props.className}>{grid}</div>;
}

export default SliderGrid;

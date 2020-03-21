import React from 'react';
import Slider from '../SliderGrid/Slider/Slider';

function SettingsGrid(props) {
  return (
    <div className="settings">
      tempo:
      <Slider
        min={30}
        max={120}
        step={1}
        value={props.settings.tempo}
        changeHandler={e => props.updateHandler('tempo', e)}
        fix
      />
      filter:
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={props.settings.filter}
        changeHandler={e => props.updateHandler('filter', e)}
      />
    </div>
  );
}

export default SettingsGrid;

import React, { Component } from 'react';
import Slider from './Slider/Slider';

class SliderGrid extends Component {
  size = 8;

  constructor(props) {
    super(props);
    this.state = { gridValues: Array(this.size).fill(0) };
  }

  componentDidUpdate(prevProps) {
    console.log('UPDATE');
    if (this.props.gridValues !== prevProps.gridValues) {
      console.log(this.props.gridValue);
    }
  }

  render() {
    const size = this.props.size || 8;
    const grid = Array(size)
      .fill(0)
      .map((row, index) => <Slider key={index} index={index} />);

    return <div className={this.props.className}>{grid}</div>;
  }
}

export default SliderGrid;

import React, { Component } from 'react';
import axios from 'axios';
import SliderGrid from '../components/Interact/SliderGrid/SliderGrid';
import holder from '../assets/red.png';

class Sandbox extends Component {
  constructor(props) {
    super(props);
    this.state = { externalData: 'NONE' };
  }

  componentDidMount() {
    this._asyncRequest = axios.get('api/ping').then(res => {
      this._asyncRequest = null;
      console.log(res);
      this.setState({ externalData: res.data.response });
    });
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    return (
      <div className="container">
        <div className="sub-nav mt-5 mb-3">
          <h2> Sandbox Testing Environment </h2>
        </div>
        <div className="row">
          <SliderGrid className="col-md-6" />
          <div className="col-md-6">
            <h2>Generated Content</h2>
            <img src={holder} className="img-fluid" alt="Responsive" />
          </div>
          <div>{this.state.externalData}</div>
        </div>
      </div>
    );
  }
}
export default Sandbox;

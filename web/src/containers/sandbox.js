import React, { Component } from 'react';
import axios from 'axios';
import SliderGrid from '../components/Interact/SliderGrid/SliderGrid';
import SettingSlider from '../components/Interact/SettingsGrid/SettingsGrid';

class Sandbox extends Component {
  size = 10;

  scale = 15;

  constructor(props) {
    super(props);
    let inputFieldDefault = Array(this.size).fill(0);
    let defaultToken = '0'.repeat(64);

    if (localStorage.getItem('field')) {
      inputFieldDefault = localStorage
        .getItem('field')
        .split(',')
        .map(Number);
    }

    if (localStorage.getItem('token')) {
      defaultToken = localStorage.getItem('token');
    }

    this.state = {
      inputField: inputFieldDefault,
      token: defaultToken,
      showPlayer: false,
      showSettings: false,
      isColor: false,
      tabs:
        'C|----------------|----------------\nR|----------------|----------------\nH|----------------|----------------\nh|----------------|----------------\nS|----------------|----------------\nT|----------------|----------------\nF|----------------|----------------\nK|----------------|----------------\n',
      settings: {
        tempo: 90,
        filter: 0.5,
        oncolor: '000000',
        offcolor: 'ffffff',
      },
    };

    this.inputFieldHandler = this.inputFieldHandler.bind(this);
    this.settingsHandler = this.settingsHandler.bind(this);
    this.showPlayerHandler = this.showPlayerHandler.bind(this);
    this.showSettingsHandler = this.showSettingsHandler.bind(this);
    this.funHandler = this.funHandler.bind(this);
    this.getTabs = this.getTabs.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (this.state.inputField !== prevState.inputField &&
        prevState.inputField !== undefined) ||
      prevState.settings.filter !== this.state.settings.filter
    ) {
      this._asyncRequest = axios
        .post('api/generate/querystring', {
          data: this.state.inputField,
          filter: this.state.settings.filter,
        })
        .then(res => {
          this._asyncRequest = null;
          const t = res.data.response;
          this.setState({
            token: t,
          });
          localStorage.setItem('token', t);
          this.getTabs(t);
        });
    }
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  settingsHandler(id, e) {
    const { value } = e.target;
    this.setState(prevState => {
      const newState = { ...prevState.settings };
      newState[id] = parseFloat(value);
      return { settings: newState };
    });
  }

  getTabs(token) {
    axios.get('api/tabs', { params: { id: token } }).then(res => {
      this.setState({ tabs: res.data.response });
    });
  }

  inputFieldHandler(id, e) {
    const { value } = e.target;
    this.setState(prevState => {
      const newState = [...prevState.inputField];
      newState[id] = parseFloat(value);
      localStorage.setItem('field', newState);
      return { inputField: newState };
    });
  }

  funHandler() {
    const condition = !this.state.isColor;
    const oncolor = condition
      ? Math.random()
          .toString(16)
          .substr(2, 6)
      : '000000';
    const offcolor = condition
      ? Math.random()
          .toString(16)
          .substr(2, 6)
      : 'ffffff';
    this.setState(prevState => {
      const newState = { ...prevState.settings };
      newState.oncolor = oncolor;
      newState.offcolor = offcolor;
      return { settings: newState, isColor: condition };
    });
  }

  showPlayerHandler() {
    this.setState(prevState => {
      const newState = !prevState.showPlayer;
      return { showPlayer: newState };
    });
  }

  showSettingsHandler() {
    this.setState(prevState => {
      const newState = !prevState.showSettings;
      return { showSettings: newState };
    });
  }

  render() {
    return (
      <div className="container">
        <div className="sub-nav mt-5 mb-3">
          <h2>Sandbox Testing Environment</h2>
        </div>
        <div className="row">
          <div className="col-md-6">
            <section>
              <h3 className="wrap">
                seed: [{this.state.inputField.toString()}]
              </h3>
              <h3 className="wrap">
                token:
                <br />
                {this.state.token}
              </h3>
            </section>
            <h2 className="pt-2">Input Field</h2>
            <SliderGrid
              size={this.size}
              updateHandler={this.inputFieldHandler}
              gridValues={this.state.inputField}
            />
          </div>
          <div className="col-md-6">
            <div className="d-flex bd-highlight align-items-center">
              <h2 className="mr-auto mb-0">Generated Content</h2>
              <button
                className="icon p-1"
                type="button"
                onClick={this.funHandler}
              >
                <span className="mu mu-star" />
              </button>
              <a
                href={`api/audio.wav?id=${this.state.token}&tempo=${this.state.settings.tempo}`}
                className="icon p-1"
                download
              >
                <span className="mu mu-download" />
              </a>
              <button
                className="icon p-1"
                type="button"
                onClick={this.showPlayerHandler}
              >
                <span className="mu mu-audio" />
              </button>
              <button
                className="icon p-1"
                type="button"
                onClick={this.showSettingsHandler}
              >
                <span className="mu mu-cog" />
              </button>
            </div>
            <img
              src={`api/plot.png?id=${this.state.token}&scale=${this.scale}&oncolor=${this.state.settings.oncolor}&offcolor=${this.state.settings.offcolor}`}
              className="img-fluid mx-auto d-block py-4"
              alt="Responsive"
            />
            {this.state.showSettings ? (
              <div>
                <h2>Environment Settings</h2>
                <SettingSlider
                  settings={this.state.settings}
                  updateHandler={this.settingsHandler}
                />
              </div>
            ) : null}
            {this.state.showPlayer ? (
              <div>
                <audio
                  controls
                  src={`api/audio.wav?id=${this.state.token}&tempo=${this.state.settings.tempo}`}
                  className="mx-auto d-block my-3"
                >
                  Your browser does not support the
                  <code>audio</code> element
                </audio>
                <div className="card text-center">
                  <section className="card-body">
                    <h2 className="card-title font-weight-bold">Drum Tabs</h2>
                    <h2 className="tabs ">{this.state.tabs}</h2>
                  </section>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Sandbox;

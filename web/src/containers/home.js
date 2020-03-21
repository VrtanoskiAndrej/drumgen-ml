import React, { Component } from 'react';
import hljs from 'highlight.js';
import * as req from '../export';

class Home extends Component {
  codeString = JSON.stringify(req, null, 2);

  componentDidMount() {
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
  }

  render() {
    return (
      <div className="container">
        <div className="sub-nav mt-5 mb-3">
          <h2> Drum Loop API v1.0 </h2>
        </div>
        <h1>Overview </h1>
        <section className="ml-2 w-75 ">
          <p>Generic Text</p>

          <pre>
            <code className="hljs json">{this.codeString}</code>
          </pre>
        </section>
        <h1>Current Version</h1>
        <p className="my-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          consectetur sagittis dapibus. Donec sit amet urna consectetur,
          facilisis nunc et, varius nulla. In tempor gravida risus, eu maximus
          lectus ultrices non. Maecenas hendrerit nisi vitae posuere efficitur.
          Maecenas vel mauris semper, volutpat augue nec, dapibus felis. Donec
          gravida odio at ante varius, lacinia ullamcorper metus consectetur.
          Fusce sit amet consectetur purus. Aliquam at sapien in lacus convallis
          venenatis eget a purus. Nullam nec ligula arcu. Cras elementum mauris
          tincidunt ligula commodo, at tristique libero hendrerit. Nulla et urna
          neque. Nulla placerat erat sapien.
        </p>

        <h1>Resource URL</h1>
        <p className="my-3">
          Nulla ultrices hendrerit eros. Morbi sem augue, efficitur sit amet
          velit quis, congue tincidunt nunc. Aliquam eu tortor vel dui dictum
          tempor. Quisque pretium orci ligula, et elementum erat sodales ac.
          Donec in quam ullamcorper, ornare odio sit amet, rutrum est. Ut eget
          felis imperdiet, congue lacus sed, pulvinar lorem. Proin porta turpis
          dictum dignissim pharetra. Duis congue rhoncus felis et mollis.
          Integer in neque mauris. Nullam maximus nunc vitae congue ultrices.
        </p>
        <h1>Parameters</h1>
        <p className="my-3">
          Proin at mauris porttitor, aliquam nisl vitae, fermentum metus.
          Suspendisse turpis leo, ullamcorper eget imperdiet eu, commodo et
          tortor. Donec luctus purus nec tempus rhoncus. Mauris elementum odio
          neque, quis scelerisque nisl tristique sed. Nulla quis justo arcu.
          Proin faucibus feugiat diam, at tincidunt magna convallis eu. Donec
          mattis lorem sit amet quam luctus vulputate. Vivamus imperdiet enim et
          urna laoreet pellentesque. In semper, enim id imperdiet dapibus, eros
          enim fermentum metus, non dictum dolor nunc eget eros. Mauris ligula
          dui, pellentesque at urna eget, bibendum tristique neque. Sed nec
          tempor ligula. Vivamus quam tellus, sodales sed arcu sed, volutpat
          vehicula sapien. Sed commodo nulla leo, et ornare lectus pulvinar id.
          Suspendisse malesuada purus dui.
        </p>
        <h1>Example Request</h1>
        <p className="my-3">
          Etiam interdum lacus eget risus feugiat, vel accumsan felis viverra.
          Nullam posuere ut odio non elementum. Praesent laoreet tempus lectus,
          ac malesuada erat mattis interdum. Sed lorem mauris, tristique quis
          sodales nec, imperdiet id est. Nullam ut vestibulum est, id sagittis
          quam. Aliquam nec metus ac turpis eleifend placerat. Vestibulum quis
          eros tincidunt, mattis turpis ac, aliquam augue. Praesent sit amet
          semper ligula, at feugiat leo. Donec sodales, tellus quis congue
          varius, lorem enim efficitur erat, at lacinia erat arcu nec dolor.
          Suspendisse et lobortis erat.
        </p>
        <h1>Example Response </h1>
        <p className="my-3">
          Maecenas ultricies elementum mi, non hendrerit sapien egestas non.
          Vestibulum nec dolor eu nisl malesuada convallis. Nullam enim eros,
          congue a nulla volutpat, maximus ornare elit. Donec porta eleifend
          magna a pharetra. Pellentesque feugiat sem massa, sed tincidunt magna
          dignissim finibus. Praesent feugiat libero ligula, sed mattis ex
          efficitur malesuada. Vestibulum laoreet urna a aliquet aliquet. Nullam
          ullamcorper ac libero at auctor. Nullam fermentum egestas neque a
          laoreet. Proin volutpat purus nec enim viverra scelerisque. Fusce in
          faucibus lacus, quis finibus risus. Mauris ut molestie lacus. Mauris
          tincidunt turpis eget justo vehicula, sit amet eleifend nulla cursus.
          Etiam mollis commodo risus, id varius enim consectetur nec.
        </p>
      </div>
    );
  }
}

export default Home;

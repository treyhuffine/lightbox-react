import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Lightbox from '../../src/lightbox-react';
import './stylesheets/app.css';
import './stylesheets/vendor/stylesheet.css';
import './stylesheets/vendor/github-light.css';

import image1 from './images/1.jpg';
import image2 from './images/2.jpg';
import image3 from './images/3.jpg';
import image4 from './images/4.jpg';
import image1Thumb from './images/1_thumb.jpg';
import image2Thumb from './images/2_thumb.jpg';
import image3Thumb from './images/3_thumb.jpg';
import image4Thumb from './images/4_thumb.jpg';
import Image from './components/image';

const images = [Image, image1, image2, image3, image4];
const thumbs = [image1Thumb, image2Thumb, image3Thumb, image4Thumb];

const titles = [
  'Title here',
  'Title here',
  'Title here',
  'Title here',
  'Title here',
];

const captions = [
  'This would be the text for a caption description of the image',
  'This would be the text for a caption description of the image',
  'This would be the text for a caption description of the image',
  'This would be the text for a caption description of the image',
  'This would be the text for a caption description of the image',
];

class App extends Component {
  static onImageLoadError(imageSrc, _srcType, errorEvent) {
    console.error(`Could not load image at ${imageSrc}`, errorEvent); // eslint-disable-line no-console
  }

  constructor() {
    super();

    this.state = {
      index: 0,
      isOpen: false,
    };

    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.moveNext = this.moveNext.bind(this);
    this.movePrev = this.movePrev.bind(this);
  }

  openLightbox() {
    this.setState({ isOpen: true });
  }

  closeLightbox() {
    this.setState({ isOpen: false });
  }

  moveNext() {
    this.setState({ index: (this.state.index + 1) % images.length });
  }

  movePrev() {
    this.setState({
      index: (this.state.index + images.length - 1) % images.length,
    });
  }

  render() {
    let lightbox;
    if (this.state.isOpen) {
      lightbox = (
        <Lightbox
          mainSrc={images[this.state.index]}
          nextSrc={images[(this.state.index + 1) % images.length]}
          prevSrc={
            images[(this.state.index + images.length - 1) % images.length]
          }
          mainSrcThumbnail={thumbs[this.state.index]}
          nextSrcThumbnail={thumbs[(this.state.index + 1) % images.length]}
          prevSrcThumbnail={
            thumbs[(this.state.index + images.length - 1) % images.length]
          }
          onCloseRequest={this.closeLightbox}
          onMovePrevRequest={this.movePrev}
          onMoveNextRequest={this.moveNext}
          onImageLoadError={App.onImageLoadError}
          imageTitle={titles[this.state.index]}
          imageCaption={captions[this.state.index]}
        />
      );
    }

    return (
      <div>
        <section className="page-header">
          <h1 className="project-name">Bonsai Lightbox</h1>
        </section>

        <section className="main-content">
          <div align="center">
            <button
              type="button"
              id="open-lightbox"
              className="demoButton"
              onClick={this.openLightbox}
            >
              Open lightbox
            </button>
            {lightbox}
          </div>
        </section>
      </div>
    );
  }
}

// eslint-disable-next-line
ReactDOM.render(<App />, document.getElementById('app'));

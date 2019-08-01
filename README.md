# Bonsai Lightbox

A lightbox for React components or images. Strings passed as arguments are
assumed to be the src for an image. Otherwise, it will check if the argument
is able to be rended as a child React component of the lightbox. Check out 
`examples` folder for a full example to play with locally.

[DEMO](https://suspicious-albattani-c9f260.netlify.com)

Features

- Keyboard shortcuts (with rate limiting)
- Image Zoom
- Flexible rendering using src values assigned on the fly
- Image preloading for smoother viewing
- Mobile friendly, with pinch to zoom and swipe
- Pass children into the header or footer toolbars

## Example

```jsx
import React, { Component } from 'react';
import Lightbox from 'bonsai-lightbox';
import 'bonsai-lightbox/style.css'; // This only needs to be imported once in your app

const images = [
  '/kitten1.jpg',
  '/kitten2.jpg',
  '/kitten3.jpg',
  '/kitten4.jpg',
];

export default class LightboxExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }

  render() {
    const { photoIndex, isOpen } = this.state;

    return (
      <div>
        <button type="button" onClick={() => this.setState({ isOpen: true })}>
          Open Lightbox
        </button>

        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
      </div>
    );
  }
}
```

## Options

| Property            |  Type  |    Default     | Required | Description                                                                                                                                                   |
| :------------------ | :----: | :------------: | :------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| mainSrc             | string |                |   yes    | Main display image url or React component                                                                                                                     |
| prevSrc             | string |                |          | Previous display image url or component (displayed to the left). If left undefined, `onMovePrevRequest` will not be called, and the button not displayed      |
| nextSrc             | string |                |          | Next display image url or component (displayed to the right). If left undefined, `onMoveNextRequest` will not be called, and the button not displayed         |
| mainSrcThumbnail    | string |                |          | Thumbnail image url corresponding to `props.mainSrc`. Displayed as a placeholder while the full-sized image loads.                                            |
| prevSrcThumbnail    | string |                |          | Thumbnail image url corresponding to `props.prevSrc`. Displayed as a placeholder while the full-sized image loads.                                            |
| nextSrcThumbnail    | string |                |          | Thumbnail image url corresponding to `props.nextSrc`. Displayed as a placeholder while the full-sized image loads.                                            |
| onCloseRequest      |  func  |                |   yes    | Close window event. Should change the parent state such that the lightbox is not rendered                                                                     |
| onMovePrevRequest   |  func  | empty function |          | Move to previous image event. Should change the parent state such that `props.prevSrc` becomes `props.mainSrc`, `props.mainSrc` becomes `props.nextSrc`, etc. |
| onMoveNextRequest   |  func  | empty function |          | Move to next image event. Should change the parent state such that `props.nextSrc` becomes `props.mainSrc`, `props.mainSrc` becomes `props.prevSrc`, etc.     |
| onImageLoadError    |  func  | empty function |          | Called when an image fails to load.<div>`<code>(imageSrc: string, srcType: string, errorEvent: object): void</code>`</div>                                    |
| discourageDownloads |  bool  |    `false`     |          | Enable download discouragement (prevents [right-click -> Save Image As...])                                                                                   |
| animationDisabled   |  bool  |    `false`     |          | Disable all animation                                                                                                                                         |
| animationOnKeyInput |  bool  |    `false`     |          | Disable animation on actions performed with keyboard shortcuts                                                                                                |
| animationDuration   | number |     `300`      |          | Animation duration (ms)                                                                                                                                       |
| keyRepeatLimit      | number |     `180`      |          | Required interval of time (ms) between key actions (prevents excessively fast navigation of images)                                                           |
| keyRepeatKeyupBonus | number |      `40`      |          | Amount of time (ms) restored after each keyup (makes rapid key presses slightly faster than holding down the key to navigate images)                          |
| imageTitle          |  node  |                |          | Image title (appears in upper toolbarRight)                                                                                                                 |
| imageCaption        |  node  |                |          | Image caption (appears in upper toolbarRight)                                                                                                               |
| headerChildren      |  node  |                |          | Pass-in children to go in the header toolbar                                                                                                                 |
| footerChildren      |  node  |                |          | Pass-in children to go in the footer toolbar                                                                                                                 |
| toolbarButtons      | node[] |                |          | Array of custom toolbar buttons                                                                                                                               |
| reactModalStyle     | Object |      `{}`      |          | Set `z-index` style, etc., for the parent react-modal ([react-modal style format](https://github.com/reactjs/react-modal#styles))                             |
| imagePadding        | number |      `10`      |          | Padding (px) between the edge of the window and the lightbox                                                                                                  |
| clickOutsideToClose |  bool  |     `true`     |          | When true, clicks outside of the image close the lightbox                                                                                                     |
| enableZoom          |  bool  |     `true`     |          | Set to false to disable zoom functionality and hide zoom buttons                                                                                              |

## Browser Compatibility

| Browser  | Works?                              |
| :------- | :---------------------------------- |
| Chrome   | Yes                                 |
| Firefox  | Yes                                 |
| Safari   | Yes                                 |
| IE >= 11 | Yes                                 |

## CircleCI integration

Because this repo package uses SSH, you will need to provide CircleCI with permissions to access it by adding a GitHub user key on your project’s **Project Settings > Checkout SSH keys** page. More information here: https://circleci.com/docs/2.0/gh-bb-integration/#enable-your-project-to-check-out-additional-private-repositories

## Issues and Bugs

If you find a bug in the source code or a mistake in the documentation, you can help us by
submitting an issue to our [Jira board](https://jira.cognizantaccelerator.com/secure/RapidBoard.jspa?projectKey=BON&rapidView=395) and label it with `support`.

## Contributing

Bonsai and its tools are used across a multitude of products within the Accelerator. With the increase in adoption and only a small core team, we could always use an extra hand! Whether you're contributing to the docs, fixing a bug, finding and reporting a bug, adding a new feature, or helping to answer questions in the [#bonsai-dev](https://cognizant-products.slack.com/messages/CBUAE8MRU/") Slack channel - you're contributions will be met with Karma 🥳 If you're unsure of where to start or what to work on, ask in the Slack channel 😸

After cloning the repository and running `npm install` inside, you can use the following commands to develop and build the project.

```sh
# Starts a webpack dev server that hosts a demo page with the lightbox.
# It uses react-hot-loader so changes are reflected on save.
npm start

# Lints the code with eslint and my custom rules.
npm run lint

# Lints and builds the code, placing the result in the dist directory.
# This build is necessary to reflect changes if you're
#  `npm link`-ed to this repository from another local project.
npm run build
```

## Slack

For more information or help, join [#bonsai-dev](https://cognizant-products.slack.com/messages/CBUAE8MRU/") in Slack.

# node-libcamera 📷

A set of wrapper functions for the native [Raspberry Pi `libcamera` API](https://www.raspberrypi.com/documentation/accessories/camera.html).

_Open to any and all contributions!_

## Installation

```bash
npm install node-libcamera
```

## Usage

### [`libcamera-still`](https://www.raspberrypi.com/documentation/accessories/camera.html#libcamera-still)

Capture an image!

```js
const { still } = require('node-libcamera')

// basic example
still({ output: 'test.jpg' })
  .then((result) => /* 📸 */ )
  .catch((error) => /* 🐛 */ )

// example with options
still({
  output: 'images/test.jpg', // output file path
  timeout: 2000, // timeout before taking the picture
  width: 640, // image width
  height: 480, // image height
})
  .then((result) => /* 📸 */ )
  .catch((error) => /* 🐛 */ )
```

### [`libcamera-vid`](https://www.raspberrypi.com/documentation/accessories/camera.html#libcamera-vid)

Record a video!

```js
const { vid } = require('node-libcamera')

// record a 10s video
vid({ output: 'test.h264', timeout: 10000, 'save-pts': 'timestamps.txt' })
  .then((result) => /* 🎥 */ )
  .catch((error) => /* 🐛 */ )
```

Note: this will result in an unpackaged video bistream, it is not wrapped in any kind of container format (such as an mp4 file). The `save-pts` option can be used to output frame timestamps so that the bitstream can subsequently be converted into an appropriate format using a tool like `mkvmerge`.

```bash
mkvmerge -o test.mkv --timecodes 0:timestamps.txt test.h264
```

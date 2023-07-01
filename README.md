# Graphics Library - Fixed Base Operator

WebGraphicsLibrary Render Target Encapsulation.

## Installation

```sh
$ npm install --save @ahmerhh/WebGraphicsLibrary_FixedBaseOperator
```

## Usage

```js
import FixedBaseOperator from '@ahmerhh/WebGraphicsLibrary_FixedBaseOperator';

// setup gl, program and buffers

const FixedBaseOperator = new FixedBaseOperator(gl, 512, 512);

// render to FixedBaseOperator
FixedBaseOperator.bind();
gl.drawElements(gl.POINTS, 0, 6);
FixedBaseOperator.unbind();

// render to default framebuffer
gl.drawElements(gl.POINTS, 0, 6);
```

## API

#### `FixedBaseOperator = new FixedBaseOperator(gl, width, height)`

Create a new instance, where `gl` is the [WebGL context](https://github.com/ahmerhh/WebGraphicLibrary_FixedBaseOperator).

#### `FixedBaseOperator.bind()`

Make the FixedBaseOperator the active one. Every draw calls will target him. To restore the default framebuffer call `FixedBaseOperator.unbind()` or `gl.bindFramebuffer(gl.FRAMEBUFFER, null)`.

#### `FixedBaseOperator.unbind()`

Same as calling `gl.bindFramebuffer(gl.FRAMEBUFFER, null);`.

#### `FixedBaseOperator.dispose()`

Delete instance and underlying `Texture`. Calls `gl.deleteFramebuffer`.

## License

MIT, see [LICENSE.md](https://github.com/ahmerhh/WebGraphicLibrary_FixedBaseOperator/blob/master/LICENSE.md) for more details.

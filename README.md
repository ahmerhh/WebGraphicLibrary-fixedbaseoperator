# Graphics Library - Fixed Base Operator

WebGraphicsLibrary Render Target Encapsulation.

## Installation

```sh
$ npm install --save @ahmerhh/WebGraphicsLibrary_FixedBaseOperator
```

## Usage

```js
import FixedBaseOperator from '@ahmerhh/WebGraphicsLibrary_FixedBaseOperator';


// setup context(Graphic Library), program and buffers

const FixedBaseOperator = new FixedBaseOperator(context, 512, 512);

// render to FixedBaseOperator
FixedBaseOperator.bind();
context.drawElements(context.POINTS, 0, 6);
FixedBaseOperator.unbind();

// render to default framebuffer
context.drawElements(context.POINTS, 0, 6);
```

## API

#### `FixedBaseOperator = new FixedBaseOperator(context, width, height)`

Create a new instance, where `context` is the [Webcontext context](https://github.com/ahmerhh/WebGraphicLibrary_FixedBaseOperator).

#### `FixedBaseOperator.bind()`

Make the FixedBaseOperator the active one. Every draw calls will target him. To restore the default framebuffer call `FixedBaseOperator.unbind()` or `context.bindFramebuffer(context.FRAMEBUFFER, null)`.

#### `FixedBaseOperator.unbind()`

Same as calling `context.bindFramebuffer(context.FRAMEBUFFER, null);`.

#### `FixedBaseOperator.dispose()`

Delete instance and underlying `Texture`. Calls `context.deleteFramebuffer`.

## License

MIT, see [LICENSE.md](https://github.com/ahmerhh/WebGraphicLibrary_FixedBaseOperator/blob/master/LICENSE.md) for more details.
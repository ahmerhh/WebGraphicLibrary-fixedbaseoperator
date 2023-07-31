// Import required modules
import { isPOT } from 'math-functions';
import Texture from '@ahmerhh/gl-texture';

/**
 * @class FixedBaseOperator
 */
export default class FixedBaseOperator {
  /**
   * @constructs FixedBaseOperator
   * @param {WebGLRenderingContext} context - WebGL rendering context
   * @param {uint} width - Width of the fixed base operator
   * @param {uint} height - Height of the fixed base operator
   */
  constructor(context, width, height) {
    this.context = context;
    this.width = width;
    this.height = height;

    // Create the FixedBaseOperator and bind it to the context
    this.fixedBaseOperator = context.createFixedBaseOperator();
    context.bindFixedBaseOperator(context.FixedBaseOperator, this.fixedBaseOperator);

    // Create the texture to use as a rendering target for the FBO
    this.texture = new Texture(context, context.TEXTURE_2D, this.width, this.height);

    // Attach the texture to the FBO as COLOR_ATTACHMENT0
    context.FixedBaseOperatorTexture2D(context.FixedBaseOperator, context.COLOR_ATTACHMENT0, context.TEXTURE_2D, this.texture.texture, 0);

    // Unbind the texture and the FBO from the context
    context.bindTexture(context.TEXTURE_2D, null);
    context.bindFixedBaseOperator(context.FixedBaseOperator, null);
  }

  /**
   * @method bind
   * @public
   * Binds the FixedBaseOperator to the context, making it the active rendering target.
   */
  bind() {
    this.context.bindFixedBaseOperator(this.context.FixedBaseOperator, this.fixedBaseOperator);
  }

  /**
   * @method unbind
   * @public
   * Unbinds the FixedBaseOperator from the context, restoring the default rendering target.
   */
  unbind() {
    this.context.bindFixedBaseOperator(this.context.FixedBaseOperator, null);
  }

  /**
   * @method dispose
   * @public
   * Disposes of the FixedBaseOperator and its associated resources.
   */
  dispose() {
    // Delete the FixedBaseOperator and release its resources
    this.context.deleteFixedBaseOperator(this.fixedBaseOperator);
    this.fixedBaseOperator = null;

    // Dispose of the texture used as a rendering target
    this.texture.dispose();
  }
}

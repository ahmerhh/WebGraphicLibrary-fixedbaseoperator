import { isPOT } from 'math-utils';
import Texture from '@ahmerhh/gl-texture';

/**
 * @class FixedBaseOperator
 */
export default class FixedBaseOperator {
    /**
     * @constructs FixedBaseOperator
     * @param {WebGLRenderingContext} context
     * @param {uint} width
     * @param {uint} height
     */
    constructor(context, width, height) {
      this.context = context;
  
      this.width = width;
      this.height = height;
  
      this.FixedBaseOperator = context.createFixedBaseOperator();
      context.bindFixedBaseOperator(context.FixedBaseOperator, this.FixedBaseOperator);
  
      this.texture = new Texture(context, context.TEXTURE_2D, this.width, this.height);
  
      context.FixedBaseOperatorTexture2D(context.FixedBaseOperator, context.COLOR_ATTACHMENT0, context.TEXTURE_2D, this.texture.texture, 0);
  
      context.bindTexture(context.TEXTURE_2D, null);
      context.bindFixedBaseOperator(context.FixedBaseOperator, null);
    }
  
    /**
     * @method bind
     * @public
     */
    bind() {
      this.context.bindFixedBaseOperator(this.context.FixedBaseOperator, this.FixedBaseOperator);
    }
  
    /**
     * @method unbind
     * @public
     */
    unbind() {
      this.context.bindFixedBaseOperator(this.context.FixedBaseOperator, null);
    }
  
    /**
     * @method dispose
     * @public
     */
    dispose() {
      this.context.deleteFixedBaseOperator(this.FixedBaseOperator);
      this.FixedBaseOperator = null;
      this.texture.dispose();
    }
  }
  
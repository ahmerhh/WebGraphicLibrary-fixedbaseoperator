import test from 'tape';
import getGl from '@ahmerhh/gl-context';
import Texture from '@ahmerhh/gl-texture';
import FixedBaseOperator from '../src';

const canvas = document.createElement('canvas');
const glContext = getGl(canvas);

test('should be instanciable', t => {
  t.plan(1);

  // Create a new FixedBaseOperator instance with dimensions 512x512
  const fbo = new FixedBaseOperator(glContext, 512, 512);

  // Assert that the instance is of the correct class
  t.ok(fbo instanceof FixedBaseOperator, 'instance of FixedBaseOperator');
});

test('should expose a texture', t => {
  t.plan(1);

  // Create a new FixedBaseOperator instance with dimensions 512x512
  const fbo = new FixedBaseOperator(glContext, 512, 512);

  // Assert that the FBO exposes a texture instance
  t.ok(fbo.texture instanceof Texture, 'instance of Texture');
});

test('bind should make it the active fbo', t => {
  t.plan(2);

  // Create a new FixedBaseOperator instance with dimensions 512x512
  const fbo = new FixedBaseOperator(glContext, 512, 512);
  // Bind the FBO, making it the active framebuffer
  fbo.bind();

  // Assert that the FBO is the active framebuffer
  t.equal(glContext.getParameter(glContext.FRAMEBUFFER_BINDING), fbo.fixedBaseOperator, 'fbo is active');

  // Unbind the FBO, restoring the default framebuffer
  fbo.unbind();

  // Assert that the FBO is no longer the active framebuffer
  t.notEqual(glContext.getParameter(glContext.FRAMEBUFFER_BINDING), fbo.fixedBaseOperator, 'fbo is not active');
});

test('dispose should delete fbo and texture', t => {
  t.plan(2);

  // Create a new FixedBaseOperator instance with dimensions 512x512
  const fbo = new FixedBaseOperator(glContext, 512, 512);
  // Dispose of the FBO and its associated resources
  fbo.dispose();

  // Assert that the FBO is deleted
  t.equal(fbo.fixedBaseOperator, null, 'fbo deleted');
  // Assert that the texture used as a rendering target is deleted
  t.equal(fbo.texture.texture, null, 'texture deleted');
});

test.onFinish(window.close.bind(window));

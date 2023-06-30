import test from 'tape';
import getcontext from '@ahmerhh/context-context';
import Texture from '@ahmerhh/context-texture';
import FixedBaseOperator from '../src';

const canvas = document.createElement('canvas');
const contextContext = getcontext(canvas);

test('should be instanciable', t => {
  t.plan(1);

  const fbo = new Fbo(contextContext, 512, 512);

  t.ok(fbo instanceof Fbo, 'instance of Fbo');
});

test('should expose a texture', t => {
  t.plan(1);

  const fbo = new Fbo(contextContext, 512, 512);

  t.ok(fbo.texture instanceof Texture, 'instance of Texture');
});

test('bind should make it the active fbo', t => {
  t.plan(2);

  const fbo = new Fbo(contextContext, 512, 512);
  fbo.bind();

  t.equal(contextContext.getParameter(contextContext.FRAMEBUFFER_BINDING), fbo.framebuffer, 'fbo is active');

  fbo.unbind();

  t.notEqual(contextContext.getParameter(contextContext.FRAMEBUFFER_BINDING), fbo.framebuffer, 'fbo is not active');
});

test('dispose should delete fbo and texture', t => {
  t.plan(2);

  const fbo = new Fbo(contextContext, 512, 512);
  fbo.dispose();

  t.equal(fbo.framebuffer, null, 'fbo deleted');
  t.equal(fbo.texture.texture, null, 'texture deleted');
});

test.onFinish(window.close.bind(window));

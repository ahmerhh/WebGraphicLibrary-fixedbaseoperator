// Import required modules
import { mat4, vec3 } from 'gl-matrix';
import getGl from '@ahmerhh/gl-context';
import Program from '@ahmerhh/gl-program';
import getPlaneGeometry from '@ahmerhh/geo-plane';
import Buffer from '@ahmerhh/gl-buffer';
import TextureDisplay from '@ahmerhh/gl-texture-display';
import Fbo from '../src/';

// Constants for canvas and particles
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const PARTICLES_COUNT_X = 16;
const PARTICLES_COUNT_Y = 16;

// Create and setup the canvas
const canvas = document.createElement('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.style.backgroundColor = '#000';
document.body.appendChild(canvas);

// Get WebGL context and set viewport
const gl = getGl(canvas);
gl.viewport(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

// Create the simulation program
const simulationProgram = new Program(gl,
  // Vertex shader source code
  `
  attribute vec3 aPosition;
  attribute vec2 aUv;
  varying vec2 vUv;
  void main() {
    vUv = aUv;
    gl_Position = vec4(aPosition, 1.0);
  }
  `,
  // Fragment shader source code
  `
  precision mediump float;
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(vUv, sin(vUv.y + uTime) * 0.25 + 0.5, 1.0);
  }
  `
);

// Add attributes and uniform to the simulation program
simulationProgram.addAttribute('aPosition', 3, gl.FLOAT);
simulationProgram.addAttribute('aUv', 2, gl.FLOAT);
simulationProgram.addUniform('uTime', gl.FLOAT);

// Create fullscreen plane
const planeGeometry = getPlaneGeometry(2, 2, 1, 1);
const planePositionsBuffer = new Buffer(gl, gl.ARRAY_BUFFER, planeGeometry.verts);
const planeUvsBuffer = new Buffer(gl, gl.ARRAY_BUFFER, planeGeometry.uvs);
const planeFacesBuffer = new Buffer(gl, gl.ELEMENT_ARRAY_BUFFER, planeGeometry.faces);

// Create the render program
const renderProgram = new Program(gl,
  // Vertex shader source code
  `
  attribute vec2 aUv;
  uniform mat4 uProjectionMatrix;
  uniform mat4 uModelViewMatrix;
  uniform sampler2D uPositionsTexture;
  #define AMPLITUDE 3.0
  void main() {
    vec3 position = texture2D(uPositionsTexture, aUv).xyz - vec3(0.5);
    position *= AMPLITUDE;
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 1.0;
  }
  `,
  // Fragment shader source code (empty)
  `void main() { gl_FragColor = vec4(1.0); }`
);

// Add attributes and uniforms to the render program
renderProgram.addAttribute('aUv', 2, gl.FLOAT);
renderProgram.addUniform('uProjectionMatrix', gl.FLOAT_MAT4);
renderProgram.addUniform('uModelViewMatrix', gl.FLOAT_MAT4);
renderProgram.addUniform('uPositionsTexture', gl.INT);

// Create the particle UVs
const uvs = new Float32Array(PARTICLES_COUNT_X * PARTICLES_COUNT_Y * 2);
for (let x = 0, i = 0; x < PARTICLES_COUNT_X; x++) {
  for (let y = 0; y < PARTICLES_COUNT_Y; y++) {
    uvs[i++] = x / (PARTICLES_COUNT_X - 1);
    uvs[i++] = y / (PARTICLES_COUNT_Y - 1);
  }
}
const particlesUvsBuffer = new Buffer(gl, gl.ARRAY_BUFFER, uvs);

// Setup the scene matrices
const projectionMatrix = mat4.create();
const modelViewMatrix = mat4.create();
mat4.perspective(projectionMatrix, 45, CANVAS_WIDTH / CANVAS_HEIGHT, 0.1, 100);
mat4.identity(modelViewMatrix);
mat4.translate(modelViewMatrix, modelViewMatrix, vec3.fromValues(0, 0, -5));

// Initialize time and create FBO
let time = 0;
const fbo = new Fbo(gl, CANVAS_WIDTH, CANVAS_HEIGHT);
const textureDisplay = new TextureDisplay(gl, fbo.texture, 0.25, 0.25, 0.75, 0);

// Main render loop
(function tick() {
  gl.clear(gl.COLOR_DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

  // Render the simulation program to FBO
  simulationProgram.bind();
  planePositionsBuffer.bind();
  simulationProgram.setAttributePointer('aPosition');
  planeUvsBuffer.bind();
  simulationProgram.setAttributePointer('aUv');
  planeFacesBuffer.bind();
  time += 0.1;
  simulationProgram.setUniform('uTime', time);

  fbo.bind();
  gl.drawElements(gl.TRIANGLES, planeFacesBuffer.length, gl.UNSIGNED_SHORT, 0);
  fbo.unbind();

  // Render the particles with the render program
  renderProgram.bind();
  particlesUvsBuffer.bind();
  renderProgram.setAttributePointer('aUv');
  mat4.rotateY(modelViewMatrix, modelViewMatrix, 0.01)
  renderProgram.setUniform('uProjectionMatrix', projectionMatrix);
  renderProgram.setUniform('uModelViewMatrix', modelViewMatrix);

  // Bind the FBO texture as input to the render program
  renderProgram.setUniform('uPositionsTexture', fbo.texture.bind(1));

 

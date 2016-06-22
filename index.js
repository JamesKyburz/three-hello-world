require('./reporterrors')
var THREE = require('three')
var OrbitViewer = require('three-orbit-viewer')
require('three-obj-loader')(THREE)
var glslify = require('glslify')

var app = OrbitViewer(THREE)({
  clearColor: 'rgba(255, 255, 255, 0.7)',
  clearAlpha: 1.0,
  fov: 65,
  position: new THREE.Vector3(1, 1, -2),
  contextAttributes: {
    antialias: false,
    alpha: false
  }
})

app.scene.add(new THREE.AmbientLight('rgb(0, 0, 0)'))
const tex = THREE.ImageUtils.loadTexture('baboon.png', undefined, () => {})

const mat = new THREE.ShaderMaterial({
  vertexShader: glslify('./vert.glsl'),
  fragmentShader: glslify('./frag.glsl'),
  uniforms: {
    iChannel0: { type: 't', value: tex },
    iGlobalTime: { type: 'f', value: 0 }
  },
  defines: {
    USE_MAP: ''
  }
})

var dir = new THREE.DirectionalLight(0xcfcfcf, 1)
dir.position.set(20, 40, -15)
app.scene.add(dir)

var loader = new THREE.OBJLoader()

var parent = new THREE.Object3D()
app.scene.add(parent)
// 'model names here'.split(' ').forEach((name) =>
//   loader.load(`models/${name}.obj`, (model) => parent.add(model) )
// )

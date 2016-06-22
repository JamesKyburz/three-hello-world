require('./reporterrors')
var THREE = require('three')
var OrbitViewer = require('three-orbit-viewer')
var glslify = require('glslify')

var app = OrbitViewer(THREE)({
  clearColor: 'rgba(50, 50, 50, 0.5)',
  clearAlpha: 1.0,
  fov: 70,
  position: new THREE.Vector3(1, 1, 1),
  contextAttributes: {
    antialias: false,
    alpha: false
  }
})

app.scene.add(new THREE.AmbientLight('rgb(0, 255, 0)'))
const tex = THREE.ImageUtils.loadTexture('baboon.png', undefined, ready)

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

var geo = new THREE.BoxGeometry(1, 1, 1)
// var mat = new THREE.MeshLambertMaterial({ color: 0xffffff })
var box = new THREE.Mesh(geo, mat)
box.rotation.y = -Math.PI
box.castShadow = true
box.visible = false

app.scene.add(box)

app.on('tick', (dt) => {
})

function ready () {
  box.visible = true
}

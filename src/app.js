var THREE = require('three')
require('./gltf')(THREE)
var OrbitViewer = require('three-orbit-viewer')
var app = OrbitViewer(THREE)({
  clearColor: 'rgba(255, 255, 255, 0.7)',
  clearAlpha: 1.0,
  fov: 35,
  far: 100000,
  once: true,
  position: new THREE.Vector3(0, 0, 0),
  target: new THREE.Vector3(0, 0, 0),
  contextAttributes: {
    antialias: false,
    alpha: false
  }
})

module.exports = app

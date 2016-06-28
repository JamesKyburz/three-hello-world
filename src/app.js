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

var pointLightIntensity = 0.75
var dirLightIntensity = 0.5

var dirLight = new THREE.DirectionalLight(0xffffff, dirLightIntensity)
dirLight.position.set(0.5, 0.75, 1)

pointLight = new THREE.PointLight(0xffffff, pointLightIntensity, 100)
pointLight.position = app.camera.position

gridHelper = new THREE.GridHelper(20, 1)

app.scene.add(gridHelper)
app.scene.add(dirLight)
app.scene.add(pointLight)

module.exports = app

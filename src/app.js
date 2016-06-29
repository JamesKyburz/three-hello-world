var THREE = require('three')
require('./plugins')
var OrbitViewer = require('three-orbit-viewer')
var app = OrbitViewer(THREE)({
  clearColor: '#888',
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

app.renderer.shadowMap.type = THREE.PCFSoftShadowMap
app.renderer.shadowMap.enabled = true

var groundMaterial = new THREE.MeshPhongMaterial({
  color: 0xFFFFFF,
  shading: THREE.SmoothShading
})

var ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(512, 512), groundMaterial)
ground.receiveShadow = true
ground.position.z = -200
ground.rotation.x = -Math.PI / 2

require('./picker')(app)

var pointLightIntensity = 0.75
var dirLightIntensity = 0.5

var dirLight = new THREE.DirectionalLight(0xffffff, dirLightIntensity)
dirLight.castShadow = true
dirLight.position.set(0.5, 0.75, 1)

var shadow = new THREE.DirectionalLightShadow(dirLight, 50)

var pointLight = new THREE.PointLight(0xffffff, pointLightIntensity, 100)
pointLight.position = app.camera.position

var spotLight = new THREE.SpotLight(0xffffff, 1)
spotLight.position.set(10, 20, 10)
spotLight.angle = 0.25
spotLight.distance = 1024
spotLight.penumbra = 0.75

spotLight.castShadow = true
spotLight.shadow.bias = 0.0001
spotLight.shadow.mapSize.width = 2048
spotLight.shadow.mapSize.height = 2048

var gridHelper = new THREE.GridHelper(20, 1)

app.scene.add(spotLight)
app.scene.add(ground)
app.scene.add(gridHelper)
app.scene.add(dirLight)
app.scene.add(shadow)
app.scene.add(pointLight)

module.exports = app

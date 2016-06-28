require('./reporterrors')

var THREE = require('three')
var raf = require('raf')
var OrbitViewer = require('three-orbit-viewer')

require('./gltf')(THREE)

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

var parent = new THREE.Object3D()
app.scene.add(parent)

var loader = new THREE.glTFLoader()

var modelUrl = window.localStorage.getItem('model')

if (modelUrl) loader.load(modelUrl, (model) => {
  parent.add(model.scene)
  var view = calculateCamera(model.scene)
  app.camera.position.copy(view.position)
  app.camera.lookAt(view.lookAt)
  app.renderer.setSize(window.innerWidth, window.innerHeight)
  render()
})

function render () {
  var matrix = app.camera.matrixWorldInverse.clone()
  if (!render.matrix || !matrix.equals(render.matrix)) {
    render.lastMatrix = matrix
    THREE.glTFShaders.update(app.scene, app.camera)
    app.renderer.render(app.scene, app.camera)
  }
  raf(render)
}

function calculateCamera (model, viewDirection) {
  viewDirection = viewDirection || new THREE.Vector3(-570.565, -2235.66, -961.08)
  var box = getCompoundBoundingBox(model)
  var diagonal = box.size().length()
  var newDelta = viewDirection.clone()
    .normalize()
    .multiplyScalar(diagonal)

  var newCenter = box.center().clone()
  newCenter.sub(newDelta)

  return { position: newCenter, lookAt: box.center() }
}

function getCompoundBoundingBox (object3D) {
  var box = null
  object3D.traverse(function (obj3D) {
    var geometry = obj3D.geometry
    if (geometry === undefined) return
    geometry.computeBoundingBox()
    console.log('geo stuff', JSON.stringify(geometry.boundingBox))
    if (box === null) {
      box = geometry.boundingBox
    } else {
      box.union(geometry.boundingBox)
    }
  })
  return box
}

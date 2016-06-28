var THREE = require('three')
var picker = require('./picker')

module.exports = (container, app, model) => {
  container.add(model.scene)
  var view = calculateCamera(model.scene)
  app.camera.position.copy(view.position)
  app.camera.lookAt(view.lookAt)
  app.renderer.setSize(window.innerWidth, window.innerHeight)
  picker.addModel(model.scene)
}

function calculateCamera (model, viewDirection) {
  viewDirection = viewDirection || new THREE.Vector3(-570.565, -2235.66, -961.08)
  model.scale.copy(new THREE.Vector3(100, 100, 100))
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

var raf = require('raf')
var THREE = require('three')

module.exports = function render (app) {
  var matrix = app.camera.matrixWorldInverse.clone()
  if (!render.matrix || !matrix.equals(render.matrix)) {
    render.lastMatrix = matrix
    THREE.glTFShaders.update(app.scene, app.camera)
    app.renderer.render(app.scene, app.camera)
  }
  raf(render.bind(null, app))
}

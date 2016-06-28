var loader = require('./loader')
var applyModel = require('./apply-model')

module.exports = (app) => {
  var modelUrl = window.localStorage.getItem('model')

  if (modelUrl) {
    loader(modelUrl, applyModel.bind(null, app.scene, app))
  } else {
    window.localStorage.setItem('model', window.prompt('model url including .gltf'))
    window.location.reload()
  }
}

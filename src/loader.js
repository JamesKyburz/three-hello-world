var THREE = require('three')

module.exports = (url, cb) => {
  var Loader = THREE.glTFLoader
  new Loader().load(url, cb)
}
